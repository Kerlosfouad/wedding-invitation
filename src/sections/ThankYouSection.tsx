import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import OrnamentalDivider from '@/components/OrnamentalDivider';
import FloralDecoration from '@/components/FloralDecoration';

gsap.registerPlugin(ScrollTrigger);

export default function ThankYouSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.footer-item');
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative py-20 md:py-[100px] bg-burgundy-dark overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="bottom-left" size="md" opacity={0.65} />
      <FloralDecoration position="bottom-right" size="md" opacity={0.65} flip />
      <div className="max-w-[800px] mx-auto px-6 flex flex-col items-center text-center">
        {/* Ornamental divider */}
        <div className="footer-item">
          <OrnamentalDivider width={200} />
        </div>

        {/* Thank you heading with shimmer */}
        <h2
          className={`
            footer-item gold-text-shimmer text-4xl md:text-[56px] font-bold mt-10
            ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
          `}
        >
          {t('footer_thanks')}
        </h2>

        {/* Closing message */}
        <p className="footer-item font-cairo text-champagne/85 text-base md:text-lg max-w-xl mt-5 leading-relaxed">
          {t('footer_message')}
        </p>

        {/* Couple signature */}
        <p className="footer-item font-vibes text-gold text-3xl md:text-4xl mt-8">
          {t('footer_signature')}
        </p>

        {/* Brand line */}
        <div className="footer-item flex items-center gap-2 mt-16">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-champagne/40"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor"
            />
          </svg>
          <span className="font-cairo text-champagne/40 text-xs">
            {t('footer_brand')}
          </span>
        </div>
      </div>
    </footer>
  );
}
