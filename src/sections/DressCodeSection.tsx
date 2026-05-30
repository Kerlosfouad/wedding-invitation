import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const colors = [
  { name: 'Deep Burgundy', hex: '#5A000F', labelAr: 'بنفسجي داكن', labelEn: 'Deep Burgundy' },
  { name: 'Luxury Red', hex: '#8B0015', labelAr: 'أحمر فاخر', labelEn: 'Luxury Red' },
  { name: 'Gold', hex: '#D4AF37', labelAr: 'ذهبي', labelEn: 'Gold' },
  { name: 'Champagne', hex: '#F4E7D3', labelAr: 'شامبانيا', labelEn: 'Champagne' },
];

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Color swatches
    const swatches = sectionRef.current.querySelectorAll('.color-swatch');
    gsap.fromTo(
      swatches,
      { scale: 0 },
      {
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: swatches[0],
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Attire cards
    const cards = sectionRef.current.querySelectorAll('.dress-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="dress"
      className="relative py-20 md:py-[120px] bg-burgundy-dark"
    >
      <div className="max-w-[1000px] mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-vibes text-gold text-5xl md:text-[64px] text-center">
          {t('dress_title')}
        </h2>

        {/* Color Palette */}
        <div className="flex items-center gap-4 md:gap-5 mt-8">
          {colors.map((color) => (
            <div key={color.hex} className="flex flex-col items-center gap-2">
              <div
                className="
                  color-swatch w-12 h-12 md:w-16 md:h-16 rounded-full
                  border-2 border-gold/30 shadow-lg
                  transition-transform duration-300 hover:scale-110
                "
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-cairo text-champagne/60 text-[10px] md:text-xs text-center">
                {locale === 'ar' ? color.labelAr : color.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* Attire Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 w-full">
          {/* Men's Card */}
          <div className="dress-card glass-card p-6 md:p-8 flex flex-col items-center group">
            <div className="w-[160px] md:w-[200px] overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/dress-men.jpg"
                alt="Men's attire"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <h3
              className={`
                text-gold text-xl md:text-2xl font-bold mt-6
                ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
              `}
            >
              {t('dress_men')}
            </h3>
            <p className="font-cairo text-champagne/80 text-sm md:text-base text-center mt-3 leading-relaxed">
              {t('dress_men_desc')}
            </p>
          </div>

          {/* Women's Card */}
          <div className="dress-card glass-card p-6 md:p-8 flex flex-col items-center group">
            <div className="w-[160px] md:w-[200px] overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/dress-women.jpg"
                alt="Women's attire"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <h3
              className={`
                text-gold text-xl md:text-2xl font-bold mt-6
                ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
              `}
            >
              {t('dress_women')}
            </h3>
            <p className="font-cairo text-champagne/80 text-sm md:text-base text-center mt-3 leading-relaxed">
              {t('dress_women_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
