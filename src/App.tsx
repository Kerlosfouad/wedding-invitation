import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/stores/useAppStore';
import GoldDustCanvas from '@/components/GoldDustCanvas';
import Navigation from '@/components/Navigation';
import AdminDashboard from '@/components/AdminDashboard';
import EnvelopeOverlay from '@/sections/EnvelopeOverlay';
import GuestGate from '@/sections/GuestGate';
import HeroSection from '@/sections/HeroSection';
import StorySection from '@/sections/StorySection';
import TimelineSection from '@/sections/TimelineSection';
import CountdownSection from '@/sections/CountdownSection';
import LocationSection from '@/sections/LocationSection';
import DressCodeSection from '@/sections/DressCodeSection';
import GallerySection from '@/sections/GallerySection';
import RSVPSection from '@/sections/RSVPSection';
import ThankYouSection from '@/sections/ThankYouSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const appPhase = useAppStore((s) => s.appPhase);
  const direction = useAppStore((s) => s.direction);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Lock/unlock scroll based on phase
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (appPhase === 'invitation') {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [appPhase]);

  // Update HTML lang and dir attributes
  useEffect(() => {
    const html = document.documentElement;
    const locale = useAppStore.getState().locale;
    html.lang = locale;
    html.dir = direction;
  }, [direction]);

  return (
    <div className="relative min-h-screen">
      {/* WebGL Gold Dust Background - always visible */}
      <GoldDustCanvas />

      {/* Admin Dashboard */}
      <AdminDashboard />

      {/* Phase 1: Envelope Overlay */}
      {appPhase === 'envelope' && <EnvelopeOverlay />}

      {/* Phase 2: Guest Gate */}
      {appPhase === 'gate' && <GuestGate />}

      {/* Phase 3: Main Invitation */}
      {appPhase === 'invitation' && (
        <>
          <Navigation />
          <main className="relative z-10">
            <HeroSection />
            <StorySection />
            <TimelineSection />
            <CountdownSection />
            <LocationSection />
            <DressCodeSection />
            <GallerySection />
            <RSVPSection />
            <ThankYouSection />
          </main>
        </>
      )}
    </div>
  );
}
