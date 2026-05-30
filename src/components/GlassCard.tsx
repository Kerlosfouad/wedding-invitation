import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export default function GlassCard({ children, className = '', strong = false }: GlassCardProps) {
  return (
    <div
      className={`
        ${strong ? 'glass-card-strong' : 'glass-card'}
        shadow-glass ${className}
      `}
    >
      {children}
    </div>
  );
}
