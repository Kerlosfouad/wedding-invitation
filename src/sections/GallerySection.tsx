import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/assets/gallery-1.jpg', alt: { ar: 'حفل الحناء', en: 'Henna Ceremony' }, span: 'tall' },
  { src: '/assets/gallery-2.jpg', alt: { ar: 'قاعة الحفل', en: 'Wedding Venue' }, span: 'normal' },
  { src: '/assets/gallery-3.jpg', alt: { ar: 'العروس', en: 'The Bride' }, span: 'tall' },
  { src: '/assets/gallery-4.jpg', alt: { ar: 'الاستقبال', en: 'The Reception' }, span: 'normal' },
  { src: '/assets/gallery-5.jpg', alt: { ar: 'العريس', en: 'The Groom' }, span: 'normal' },
  { src: '/assets/gallery-6.jpg', alt: { ar: 'خواتم الزواج', en: 'Wedding Rings' }, span: 'normal' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.gallery-item');
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    },
    [closeLightbox, goNext, goPrev]
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-20 md:py-[120px] bg-burgundy"
      onKeyDown={lightboxOpen ? handleKeyDown : undefined}
      tabIndex={lightboxOpen ? 0 : undefined}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-vibes text-gold text-5xl md:text-[64px] text-center">
          {t('gallery_title')}
        </h2>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10 w-full">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`
                gallery-item relative overflow-hidden rounded-lg cursor-pointer
                shadow-md group
                ${img.span === 'tall' ? 'row-span-2' : ''}
              `}
              onClick={() => openLightbox(i)}
            >
              <div
                className={`
                  relative overflow-hidden
                  ${img.span === 'tall' ? 'h-[300px] md:h-[500px]' : 'h-[145px] md:h-[240px]'}
                `}
              >
                <img
                  src={img.src}
                  alt={img.alt[locale]}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110
                  "
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-burgundy-dark/70 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    border border-gold/40 rounded-lg
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-burgundy-dark/95 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.3s ease' }}
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 p-2 text-gold hover:text-gold-light transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="
              absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10
              p-2 text-gold hover:text-gold-light transition-colors
            "
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="
              absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10
              p-2 text-gold hover:text-gold-light transition-colors
            "
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <img
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt[locale]}
            className="
              relative z-[1] max-w-[90vw] max-h-[85vh] object-contain rounded-lg
              animate-in fade-in zoom-in-95 duration-300
            "
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
