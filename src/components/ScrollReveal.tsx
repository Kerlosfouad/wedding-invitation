import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 60,
  duration = 1.2,
  stagger = 0.15,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
