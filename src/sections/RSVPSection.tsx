import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/hooks/useTranslation';
import { Minus, Plus } from 'lucide-react';
import LuxuryButton from '@/components/LuxuryButton';
import FloralDecoration from '@/components/FloralDecoration';

gsap.registerPlugin(ScrollTrigger);

export default function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    attending: null as boolean | null,
    guestCount: 1,
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { t, locale } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current || submitted) return;

    const fields = sectionRef.current.querySelectorAll('.rsvp-field');
    gsap.fromTo(
      fields,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef, dependencies: [submitted] });

  // Confetti animation
  const playConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
      const speed = 3 + Math.random() * 6;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 4 + Math.random() * 4,
        opacity: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      let alive = false;
      particles.forEach((p) => {
        if (p.opacity <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = '#D4AF37';
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (alive && frame < 300) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim() || formData.attending === null) return;

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('RSVP submitted:', formData);

    setSubmitting(false);
    setSubmitted(true);

    // Animate form out, success in
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
      });
    }

    setTimeout(() => {
      playConfetti();
      if (successRef.current) {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }

      // Animate seal
      const seal = successRef.current?.querySelector('.success-seal');
      if (seal) {
        gsap.fromTo(
          seal,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }
        );
      }
    }, 350);
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-20 md:py-[120px] bg-burgundy-dark overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="bottom-right" size="sm" opacity={0.5} flip />
      <FloralDecoration position="top-left" size="sm" opacity={0.45} />

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-50 pointer-events-none"
      />

      <div className="max-w-[640px] mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="rsvp-field font-vibes text-gold text-5xl md:text-[64px] text-center">
          {t('rsvp_title')}
        </h2>

        {!submitted ? (
          /* Form */
          <div
            ref={formRef}
            className="w-full mt-10 glass-card p-6 md:p-12"
          >
            {/* Name */}
            <div className="rsvp-field mb-6">
              <label className="block font-cairo text-gold text-sm font-medium mb-2">
                {t('rsvp_name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t('rsvp_name_placeholder')}
                className="
                  w-full h-[52px] px-4 rounded-md
                  bg-burgundy-dark/50 border border-gold/25
                  text-champagne placeholder:text-champagne/40
                  focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/15
                  transition-all duration-300
                "
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Attendance toggle */}
            <div className="rsvp-field mb-6">
              <label className="block font-cairo text-gold text-sm font-medium mb-2">
                {t('rsvp_attending')}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setFormData({ ...formData, attending: true })
                  }
                  className={`
                    flex-1 h-12 rounded-md font-cairo text-base
                    transition-all duration-300
                    ${
                      formData.attending === true
                        ? 'bg-gold text-burgundy-dark font-medium'
                        : 'bg-transparent border border-gold/30 text-champagne hover:border-gold'
                    }
                  `}
                >
                  {t('rsvp_yes')}
                </button>
                <button
                  onClick={() =>
                    setFormData({ ...formData, attending: false })
                  }
                  className={`
                    flex-1 h-12 rounded-md font-cairo text-base
                    transition-all duration-300
                    ${
                      formData.attending === false
                        ? 'bg-gold text-burgundy-dark font-medium'
                        : 'bg-transparent border border-gold/30 text-champagne hover:border-gold'
                    }
                  `}
                >
                  {t('rsvp_no')}
                </button>
              </div>
            </div>

            {/* Guest count (conditional) */}
            {formData.attending === true && (
              <div className="rsvp-field mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block font-cairo text-gold text-sm font-medium mb-2">
                  {t('rsvp_guests')}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        guestCount: Math.max(1, formData.guestCount - 1),
                      })
                    }
                    className="
                      w-10 h-10 rounded-md border border-gold/30
                      flex items-center justify-center text-gold
                      hover:bg-gold/10 transition-colors
                    "
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-[60px] text-center text-champagne text-lg font-cairo">
                    {formData.guestCount}
                  </span>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        guestCount: Math.min(10, formData.guestCount + 1),
                      })
                    }
                    className="
                      w-10 h-10 rounded-md border border-gold/30
                      flex items-center justify-center text-gold
                      hover:bg-gold/10 transition-colors
                    "
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="rsvp-field mb-6">
              <label className="block font-cairo text-gold text-sm font-medium mb-2">
                {t('rsvp_notes')}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder={t('rsvp_notes_placeholder')}
                rows={4}
                className="
                  w-full px-4 py-3 rounded-md resize-y
                  bg-burgundy-dark/50 border border-gold/25
                  text-champagne placeholder:text-champagne/40
                  focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/15
                  transition-all duration-300
                "
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Submit */}
            <div className="rsvp-field">
              <LuxuryButton
                onClick={handleSubmit}
                disabled={
                  !formData.name.trim() ||
                  formData.attending === null ||
                  submitting
                }
                className="w-full"
              >
                {submitting ? '...' : t('rsvp_submit')}
              </LuxuryButton>
            </div>
          </div>
        ) : (
          /* Success state */
          <div
            ref={successRef}
            className="w-full mt-10 glass-card p-8 md:p-12 flex flex-col items-center opacity-0"
          >
            {/* Gold seal */}
            <div
              className="
                success-seal w-20 h-20 rounded-full
                bg-gradient-to-br from-gold-light via-gold to-gold-dark
                flex items-center justify-center
                shadow-gold
              "
            >
              <svg viewBox="0 0 40 40" className="w-12 h-12">
                <path
                  d="M20 6L23 16H34L25 22L28 33L20 26L12 33L15 22L6 16H17Z"
                  fill="rgba(90, 0, 15, 0.6)"
                />
              </svg>
            </div>

            <h3
              className={`
                text-gold text-3xl md:text-4xl font-bold mt-6
                ${locale === 'en' ? 'font-playfair' : 'font-amiri'}
              `}
            >
              {t('rsvp_thanks')}
            </h3>

            <p className="font-cairo text-champagne text-base md:text-lg text-center mt-4 max-w-md">
              {t('rsvp_thanks_msg')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
