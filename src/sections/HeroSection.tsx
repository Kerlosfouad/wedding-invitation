import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronDown } from 'lucide-react';
import FloralDecoration from '@/components/FloralDecoration';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const appPhase = useAppStore((s) => s.appPhase);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (appPhase !== 'invitation' || !contentRef.current) return;

    const elements = contentRef.current.querySelectorAll('.hero-item');
    gsap.set(elements, { opacity: 0, y: 30 });

    // Set specific initial states
    const groomName = contentRef.current.querySelector('.hero-groom');
    const brideName = contentRef.current.querySelector('.hero-bride');
    const heart = contentRef.current.querySelector('.hero-heart');

    if (groomName) gsap.set(groomName, { opacity: 0, x: locale === 'ar' ? 60 : -60 });
    if (brideName) gsap.set(brideName, { opacity: 0, x: locale === 'ar' ? -60 : 60 });
    if (heart) gsap.set(heart, { opacity: 0, scale: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    // Opening phrase
    tl.to('.hero-phrase', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
    })
      // Invitation statement
      .to(
        '.hero-invite',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        '-=0.5'
      )
      // Couple names from sides
      .to(
        groomName,
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        '-=0.3'
      )
      .to(
        heart,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.8'
      )
      .to(
        brideName,
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        '-=0.6'
      )
      // Date
      .to(
        '.hero-date',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        '-=0.5'
      )
      // Location
      .to(
        '.hero-location',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        '-=0.5'
      )
      // Scroll CTA
      .to(
        '.hero-scroll',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        '-=0.3'
      );

    // Scroll exit animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=50%',
      scrub: true,
      onUpdate: (self) => {
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            opacity: 1 - self.progress * 0.8,
            scale: 1 - self.progress * 0.05,
          });
        }
      },
    });
  }, { scope: sectionRef, dependencies: [appPhase, locale] });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(139, 0, 21, 0.6) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(61, 0, 10, 0.8) 100%)',
        }}
      />

      {/* Floral decorations */}
      <FloralDecoration position="bottom-left" size="lg" opacity={0.7} />
      <FloralDecoration position="bottom-right" size="lg" opacity={0.7} flip />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Opening phrase */}
        <p
          className={`
            hero-item hero-phrase font-amiri text-gold text-lg md:text-xl mb-8
            ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
          `}
        >
          {t('hero_bismillah')}
        </p>

        {/* Invitation statement */}
        <p className="hero-item hero-invite font-cairo text-champagne/85 text-base md:text-lg max-w-xl leading-relaxed mb-8">
          {t('hero_invite')}
        </p>

        {/* Couple names */}
        <div className="flex items-center gap-4 md:gap-5 mb-6">
          <h1
            className="hero-item hero-groom font-vibes text-gold text-6xl md:text-8xl lg:text-[100px]"
          >
            {t('hero_groom')}
          </h1>

          {/* Heart icon */}
          <div className="hero-item hero-heart">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold md:w-10 md:h-10"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1
            className="hero-item hero-bride font-vibes text-gold text-6xl md:text-8xl lg:text-[100px]"
          >
            {t('hero_bride')}
          </h1>
        </div>

        {/* Date */}
        <p className="hero-item hero-date font-cairo text-champagne text-lg md:text-[22px] font-medium mt-4">
          {t('hero_date')}
        </p>

        {/* Location */}
        <p className="hero-item hero-location font-cairo text-champagne/70 text-base md:text-lg mt-2">
          {t('hero_location')}
        </p>

        {/* Scroll CTA */}
        <div className="hero-item hero-scroll mt-12">
          <ChevronDown
            className="w-6 h-6 text-gold animate-scroll-chevron"
          />
        </div>
      </div>
    </section>
  );
}
