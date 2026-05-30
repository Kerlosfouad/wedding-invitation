import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCountdown } from '@/hooks/useCountdown';
import { useGuestStore } from '@/stores/guestStore';

gsap.registerPlugin(ScrollTrigger);

interface CountdownCardProps {
  value: number;
  label: string;
  delay: number;
}

function CountdownCard({ value, label, delay }: CountdownCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(value);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (value !== prevValueRef.current && !animatingRef.current) {
      animatingRef.current = true;
      const oldEl = cardRef.current?.querySelector('.countdown-old');
      const newEl = cardRef.current?.querySelector('.countdown-new');

      if (oldEl && newEl) {
        gsap.fromTo(
          oldEl,
          { y: 0, opacity: 1 },
          { y: '-100%', opacity: 0, duration: 0.3, ease: 'power2.in' }
        );
        gsap.fromTo(
          newEl,
          { y: '100%', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              prevValueRef.current = value;
              animatingRef.current = false;
            },
          }
        );
      }
    }
  }, [value]);

  return (
    <div
      ref={cardRef}
      className="
        glass-card
        w-[75px] h-[100px] md:w-[160px] md:h-[180px]
        flex flex-col items-center justify-center
        animate-pulse-glow
      "
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative overflow-hidden h-10 md:h-16 w-full flex items-center justify-center">
        <span className="countdown-old absolute inset-0 flex items-center justify-center font-amiri text-gold font-bold text-4xl md:text-[64px] tabular-nums">
          {String(prevValueRef.current).padStart(2, '0')}
        </span>
        <span className="countdown-new absolute inset-0 flex items-center justify-center font-amiri text-gold font-bold text-4xl md:text-[64px] tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-cairo text-champagne/70 text-[11px] md:text-base mt-2 md:mt-2">
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const { days, hours, minutes, seconds } = useCountdown();
  const guestName = useGuestStore((s) => s.guestName);

  useGSAP(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative py-20 md:py-[120px] bg-burgundy-dark"
    >
      {/* Subtle gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139, 0, 21, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[900px] mx-auto px-6 flex flex-col items-center">
        {/* Personalized greeting */}
        <h3
          className={`
            text-gold text-xl md:text-[28px] font-bold text-center
            ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
          `}
        >
          {guestName
            ? `${t('countdown_greeting')} ${guestName}`
            : t('countdown_greeting_fallback')}
        </h3>

        {/* Countdown label */}
        <p className="font-cairo text-champagne/70 text-base md:text-lg text-center mt-4">
          {t('countdown_label')}
        </p>

        {/* Countdown cards */}
        <div
          ref={cardsRef}
          className="flex flex-row items-center justify-center gap-3 md:gap-6 mt-10"
        >
          <CountdownCard
            value={days}
            label={t('countdown_days')}
            delay={0}
          />
          <CountdownCard
            value={hours}
            label={t('countdown_hours')}
            delay={0.5}
          />
          <CountdownCard
            value={minutes}
            label={t('countdown_minutes')}
            delay={1}
          />
          <CountdownCard
            value={seconds}
            label={t('countdown_seconds')}
            delay={1.5}
          />
        </div>

        {/* Wedding date */}
        <p
          className={`
            text-champagne text-lg md:text-2xl text-center mt-10
            ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
          `}
        >
          {t('countdown_date')}
        </p>
      </div>
    </section>
  );
}
