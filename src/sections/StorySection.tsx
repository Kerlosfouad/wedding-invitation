import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import OrnamentalDivider from '@/components/OrnamentalDivider';
import FloralDecoration from '@/components/FloralDecoration';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Portrait clip-path reveal
    if (portraitRef.current) {
      gsap.fromTo(
        portraitRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    // Portrait parallax
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: 20 },
        {
          y: -20,
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

    // Text reveal
    const textElements = sectionRef.current.querySelectorAll('.story-text');
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: textElements[0],
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-20 md:py-[120px] bg-burgundy-dark overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="top-right" size="md" opacity={0.6} flip />
      <FloralDecoration position="bottom-left" size="md" opacity={0.6} />
      <div className="max-w-[1000px] mx-auto px-6 flex flex-col items-center">
        {/* Top ornamental divider */}
        <OrnamentalDivider width={200} />

        {/* Portrait container */}
        <div
          ref={portraitRef}
          className="w-[280px] md:w-[400px] mt-10 rounded-lg overflow-hidden gold-border shadow-card"
          style={{ aspectRatio: '4/5' }}
        >
          <img
            ref={imageRef}
            src="/assets/couple-portrait.jpg"
            alt="Ahmed and Sarah"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <h2 className="story-text font-vibes text-gold text-5xl md:text-[64px] mt-10 text-center">
          {t('story_names')}
        </h2>

        {/* Story text */}
        <p className="story-text font-cairo text-champagne/85 text-base md:text-lg text-center max-w-xl mt-5 leading-relaxed">
          {t('story_text')}
        </p>

        {/* Secondary divider */}
        <div className="story-text mt-8">
          <OrnamentalDivider width={120} />
        </div>
      </div>
    </section>
  );
}
