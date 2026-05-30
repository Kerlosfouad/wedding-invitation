import type { ReactNode } from 'react';

interface LuxuryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'gradient' | 'ghost';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  icon?: ReactNode;
}

export default function LuxuryButton({
  children,
  onClick,
  variant = 'gradient',
  disabled = false,
  className = '',
  type = 'button',
  icon,
}: LuxuryButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    h-14 px-8 rounded-md font-cairo font-medium text-lg
    transition-all duration-300 luxury-ease
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
    ${className}
  `;

  const variantClasses =
    variant === 'gradient'
      ? `
        bg-gradient-to-br from-gold to-gold-dark
        text-burgundy-dark
        shadow-gold hover:shadow-gold-lg
        hover:-translate-y-0.5
        active:translate-y-0
      `
      : `
        bg-transparent border border-gold text-gold
        hover:bg-gold hover:text-burgundy-dark
        active:translate-y-0
      `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
