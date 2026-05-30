import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import OrnamentalDivider from '@/components/OrnamentalDivider';

export default function EnvelopeOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);
  const setAppPhase = useAppStore((s) => s.setAppPhase);
  const { t } = useTranslation();

  const handleOpen = useCallback(() => {
    if (opening) return;
    setOpening(true);

    const tl = gsap.timeline({ onComplete: () => setAppPhase('gate') });
    const isMobile = window.innerWidth < 768;

    // Phase 1: Seal break
    tl.to(sealRef.current, { scale: 1.2, duration: 0.2, ease: 'power2.out' })
      .to(sealRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.out' })
      .to(shardsRef.current?.children || [], { opacity: 1, scale: 1, duration: 0.1 }, '-=0.2')
      .to(shardsRef.current?.children || [], {
        x: (i: number) => [-25, 25, -25, 25][i],
        y: (i: number) => [-25, -25, 25, 25][i],
        opacity: 0, scale: 0, duration: 0.4, ease: 'power2.out', stagger: 0.02,
      });

    // Phase 2: Flap opens
    tl.to(flapRef.current, { rotateX: -180, duration: 0.8, ease: 'power3.inOut' }, '-=0.1');

    // Phase 3: Letter fades in and slides up above envelope
    tl.to(letterRef.current, {
      opacity: 1,
      y: isMobile ? '-42vw' : '-155px',
      duration: 0.75,
      ease: 'power2.out',
    });

    // Phase 4: Wait 5s then zoom out
    tl.to(envelopeRef.current, { scale: 2.5, opacity: 0, duration: 0.8, ease: 'power3.in' }, '+=5');
  }, [opening, setAppPhase]);

  // Idle float
  useGSAP(() => {
    if (!envelopeRef.current || opening) return;
    gsap.to(envelopeRef.current, {
      y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
  }, { scope: containerRef, dependencies: [opening] });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-burgundy-dark"
    >
      {/* Outer wrapper — positions envelope + letter together */}
      <div
        ref={envelopeRef}
        className="relative cursor-pointer mt-16 md:mt-20"
        onClick={handleOpen}
        style={{ perspective: '1200px' }}
      >

        {/* ── Letter: sibling above envelope, hidden initially ── */}
        <div
          ref={letterRef}
          className="absolute left-[8%] right-[8%] rounded-sm pointer-events-none"
          style={{
            top: '5%',
            height: '85%',
            opacity: 0,
            zIndex: 50,
            background: 'linear-gradient(160deg, #FDF6E3 0%, #F4E7D3 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full px-4 gap-1">
            <OrnamentalDivider width={100} />
            <p className="font-vibes text-burgundy text-xl md:text-2xl text-center mt-2">
              حفلة زفاف
            </p>
            <p className="font-cairo text-burgundy-light text-xs md:text-sm text-center opacity-75">
              {t('envelope_invite')}
            </p>
            <p className="font-vibes text-gold-dark text-2xl md:text-4xl text-center mt-1">
              {t('hero_groom')} &amp; {t('hero_bride')}
            </p>
            <div className="mt-2">
              <OrnamentalDivider width={80} />
            </div>
          </div>
        </div>

        {/* ── Envelope wrapper ── */}
        <div
          className="relative w-[85vw] max-w-[500px]"
          style={{ aspectRatio: '1.6 / 1' }}
        >
          {/* Base */}
          <div
            className="absolute inset-0 z-10 rounded-sm"
            style={{
              background: 'linear-gradient(160deg, #7A0012 0%, #5A000F 50%, #3D000A 100%)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,175,55,0.12)',
            }}
          />

          {/* Bottom triangle */}
          <div
            className="absolute inset-0 z-20"
            style={{
              clipPath: 'polygon(0% 100%, 50% 52%, 100% 100%)',
              background: 'linear-gradient(180deg, #6B0012 0%, #4A000C 100%)',
              filter: 'brightness(0.85)',
            }}
          />

          {/* Left triangle */}
          <div
            className="absolute inset-0 z-20"
            style={{
              clipPath: 'polygon(0% 0%, 0% 100%, 48% 50%)',
              background: 'linear-gradient(135deg, #5A000F 0%, #4A000C 100%)',
              filter: 'brightness(0.9)',
            }}
          />

          {/* Right triangle */}
          <div
            className="absolute inset-0 z-20"
            style={{
              clipPath: 'polygon(100% 0%, 52% 50%, 100% 100%)',
              background: 'linear-gradient(225deg, #5A000F 0%, #4A000C 100%)',
              filter: 'brightness(0.9)',
            }}
          />

          {/* Center shimmer */}
          <div
            className="absolute inset-0 z-[25] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 65%)',
            }}
          />

          {/* Top flap */}
          <div
            ref={flapRef}
            className="absolute inset-0 z-30"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 52% 50%, 48% 50%)',
              background: 'linear-gradient(180deg, #8B0015 0%, #5A000F 80%, #4A000C 100%)',
              transformOrigin: 'center top',
              filter: 'brightness(1.05)',
            }}
          />

          {/* Gold Seal */}
          <div
            ref={sealRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-14 md:h-14 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #F0D060, #D4AF37, #A07810)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            <svg viewBox="0 0 40 40" className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)]">
              <path d="M20 6L23 16H34L25 22L28 33L20 26L12 33L15 22L6 16H17Z" fill="rgba(255,255,255,0.28)" />
            </svg>
          </div>

          {/* Seal shards */}
          <div
            ref={shardsRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-3 h-3 md:w-4 md:h-4 opacity-0"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #F0D060, #D4AF37)',
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  transform: `rotate(${i * 90}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Instruction */}
      <p
        className={`
          mt-10 font-cairo text-champagne/70 text-base text-center
          animate-float transition-opacity duration-500
          ${opening ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {t('envelope_click')}
      </p>
    </div>
  );
}
