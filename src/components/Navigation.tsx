import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useAdminStore } from '@/stores/adminStore';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const appPhase = useAppStore((s) => s.appPhase);
  const setAdminOpen = useAdminStore((s) => s.setAdminOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (appPhase !== 'invitation') return null;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 h-16
          flex items-center justify-between
          px-6 md:px-12
          transition-all duration-500
          ${
            scrolled
              ? 'bg-burgundy-dark/95 backdrop-blur-md'
              : 'bg-transparent'
          }
        `}
      >
        {/* Logo — always "Invitation" in Great Vibes */}
        <div className="select-none">
          <span
            className="font-vibes text-gold text-2xl md:text-3xl"
          >
            Invitation
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          {/* Admin lock button */}
          <button
            onClick={() => setAdminOpen(true)}
            className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-all duration-300"
            aria-label="Admin dashboard"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
