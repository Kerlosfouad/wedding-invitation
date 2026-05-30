import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/stores/useAppStore';
import { useGuestStore } from '@/stores/guestStore';
import { useTranslation } from '@/hooks/useTranslation';
import LuxuryButton from '@/components/LuxuryButton';
import OrnamentalDivider from '@/components/OrnamentalDivider';

export default function GuestGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const setAppPhase = useAppStore((s) => s.setAppPhase);
  const setGuestName = useGuestStore((s) => s.setGuestName);
  const { t, locale } = useTranslation();

  // Entrance animation
  useGSAP(() => {
    if (!cardRef.current) return;
    const elements = cardRef.current.querySelectorAll('.gate-item');
    gsap.set(cardRef.current, { opacity: 0, scale: 0.9, y: 30 });
    gsap.set(elements, { opacity: 0, y: 20 });

    gsap.to(cardRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
    });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
      delay: 0.2,
    });
  }, { scope: containerRef });

  const handleSubmit = () => {
    if (!name.trim()) return;

    const trimmedName = name.trim();
    setGuestName(trimmedName);

    // Exit animation
    const elements = cardRef.current?.querySelectorAll('.gate-item');
    gsap.to(elements || [], {
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
    });

    gsap.to(cardRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.4,
      delay: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setAppPhase('invitation');
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-burgundy-dark"
    >
      <div ref={cardRef} className="w-[90vw] max-w-[480px] glass-card-strong p-8 md:p-12">
        <div className="flex flex-col items-center">
          {/* Ornamental divider */}
          <div className="gate-item">
            <OrnamentalDivider width={120} />
          </div>

          {/* Welcome title */}
          <h2
            className={`
              gate-item font-amiri text-gold text-2xl md:text-[28px] text-center mt-6
              ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
            `}
          >
            {t('gate_welcome')}
          </h2>

          {/* Subtitle */}
          <p className="gate-item font-cairo text-champagne/70 text-sm md:text-base text-center mt-3">
            {t('gate_subtitle')}
          </p>

          {/* Name input */}
          <div className="gate-item w-full mt-8">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('gate_placeholder')}
              className={`
                w-full h-[52px] px-4 rounded-md
                bg-burgundy-dark/60 border border-gold/30
                text-champagne text-center text-base
                placeholder:text-champagne/40
                focus:border-gold focus:outline-none
                focus:ring-[3px] focus:ring-gold/15
                transition-all duration-300
                ${locale === 'ar' ? 'font-cairo' : 'font-inter'}
              `}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              autoFocus
            />
          </div>

          {/* Submit button */}
          <div className="gate-item w-full mt-6">
            <LuxuryButton
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="w-full"
            >
              {t('gate_button')}
            </LuxuryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
