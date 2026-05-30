import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const appPhase = useAppStore((s) => s.appPhase);

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
        <div className="flex items-center gap-4">
          <LanguageToggle />
        </div>
      </nav>
    </>
  );
}
