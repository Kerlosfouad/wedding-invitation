import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import { MapPin, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLImageElement>(null);
  const [copied, setCopied] = useState(false);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.location-item');
    gsap.fromTo(
      elements,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );

    // Map parallax
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }, { scope: sectionRef });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        'Al Faisaliah Tower, King Fahd Road, Riyadh'
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = 'Al Faisaliah Tower, King Fahd Road, Riyadh';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/search/Al+Faisaliah+Tower,+King+Fahd+Road,+Riyadh',
      '_blank'
    );
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative py-20 md:py-[120px] bg-burgundy"
    >
      <div className="max-w-[800px] mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="location-item font-vibes text-gold text-5xl md:text-[64px] text-center">
          {t('location_title')}
        </h2>

        {/* Map card */}
        <div className="location-item w-full mt-10 glass-card overflow-hidden">
          {/* Map image */}
          <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden rounded-t-xl">
            <img
              ref={mapRef}
              src="/assets/map-riyadh.jpg"
              alt="Map to Al Faisaliah Hotel"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(0.8) contrast(1.1)' }}
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 60%, rgba(90, 0, 15, 0.8) 100%)',
              }}
            />
          </div>

          {/* Venue details */}
          <div className="p-6 md:p-8 flex flex-col items-center text-center">
            <h3
              className={`
                text-gold text-2xl md:text-[28px] font-bold
                ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
              `}
            >
              {t('location_hotel')}
            </h3>
            <p className="font-cairo text-champagne/80 text-sm md:text-base mt-2">
              {t('location_address')}
            </p>
            <p className="font-cairo text-champagne/70 text-sm md:text-base mt-1">
              {t('location_time')}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
              <button
                onClick={handleOpenMaps}
                className="
                  flex items-center justify-center gap-2
                  h-12 px-6 rounded-md
                  border border-gold text-gold
                  font-cairo text-base
                  transition-all duration-300
                  hover:bg-gold hover:text-burgundy-dark
                "
              >
                <MapPin className="w-4 h-4" />
                {t('location_maps')}
              </button>
              <button
                onClick={handleCopy}
                className="
                  flex items-center justify-center gap-2
                  h-12 px-6 rounded-md
                  border border-gold text-gold
                  font-cairo text-base
                  transition-all duration-300
                  hover:bg-gold hover:text-burgundy-dark
                "
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? t('location_copied') : t('location_copy')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
