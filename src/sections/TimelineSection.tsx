import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import { Users, Heart, UtensilsCrossed, Camera, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const icons = [Users, Heart, UtensilsCrossed, Camera, Music];

const events = [
  {
    timeKey: 'timeline_reception_time',
    titleKey: 'timeline_reception_title',
    descKey: 'timeline_reception_desc',
    position: 'left' as const,
  },
  {
    timeKey: 'timeline_ceremony_time',
    titleKey: 'timeline_ceremony_title',
    descKey: 'timeline_ceremony_desc',
    position: 'right' as const,
  },
  {
    timeKey: 'timeline_dinner_time',
    titleKey: 'timeline_dinner_title',
    descKey: 'timeline_dinner_desc',
    position: 'left' as const,
  },
  {
    timeKey: 'timeline_photo_time',
    titleKey: 'timeline_photo_title',
    descKey: 'timeline_photo_desc',
    position: 'right' as const,
  },
  {
    timeKey: 'timeline_celebration_time',
    titleKey: 'timeline_celebration_title',
    descKey: 'timeline_celebration_desc',
    position: 'left' as const,
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Timeline line draw
    gsap.fromTo(
      trackRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );

    // Event cards
    const cards = sectionRef.current.querySelectorAll('.timeline-card');
    const dots = sectionRef.current.querySelectorAll('.timeline-dot');

    cards.forEach((card, i) => {
      const isLeft = events[i].position === 'left';
      gsap.fromTo(
        card,
        { opacity: 0, x: isLeft ? -80 : 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    // Dots
    dots.forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-20 md:py-[120px] bg-burgundy"
    >
      <div className="max-w-[900px] mx-auto px-6">
        {/* Title */}
        <h2 className="font-vibes text-gold text-5xl md:text-[64px] text-center mb-16">
          {t('timeline_title')}
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical track */}
          <div
            ref={trackRef}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, #D4AF37 10%, #D4AF37 90%, transparent 100%)',
            }}
          />

          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {events.map((event, i) => {
              const Icon = icons[i];
              const isLeft = event.position === 'left';

              return (
                <div
                  key={i}
                  className={`
                    relative flex items-center
                    ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
                  `}
                >
                  {/* Card */}
                  <div
                    className={`
                      timeline-card ml-12 md:ml-0
                      ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}
                      w-[calc(100%-3rem)] md:w-[380px]
                    `}
                  >
                    <div
                      className="
                        bg-burgundy/50 backdrop-blur-sm
                        border border-gold/20 rounded-lg
                        p-5 md:p-6
                        flex items-start gap-4
                      "
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p
                          className={`
                            text-gold text-lg md:text-[22px] font-bold
                            ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
                          `}
                        >
                          {t(event.timeKey)}
                        </p>
                        <p className="text-champagne text-base md:text-lg mt-1 font-cairo">
                          {t(event.titleKey)}
                        </p>
                        <p className="text-champagne/60 text-sm mt-1 font-cairo">
                          {t(event.descKey)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className={`
                      timeline-dot absolute left-5 md:left-1/2
                      w-3 h-3 rounded-full bg-gold
                      border-2 border-burgundy
                      -translate-x-1/2
                    `}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
