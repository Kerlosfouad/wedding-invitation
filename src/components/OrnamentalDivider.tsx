import { forwardRef } from 'react';

interface OrnamentalDividerProps {
  width?: number;
  className?: string;
}

const OrnamentalDivider = forwardRef<SVGSVGElement, OrnamentalDividerProps>(
  ({ width = 200, className = '' }, ref) => {
    return (
      <svg
        ref={ref}
        width={width}
        height="24"
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`mx-auto ${className}`}
      >
        {/* Center diamond */}
        <path
          d="M100 2L106 8L100 14L94 8Z"
          fill="#D4AF37"
          fillOpacity="0.8"
        />
        <circle cx="100" cy="8" r="2" fill="#D4AF37" />
        
        {/* Left floral branch */}
        <path
          d="M94 8C85 8 80 4 70 4C60 4 55 8 46 8"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />
        <path
          d="M88 8C80 8 75 12 65 12C55 12 50 8 42 8"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          fill="none"
        />
        
        {/* Right floral branch */}
        <path
          d="M106 8C115 8 120 4 130 4C140 4 145 8 154 8"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />
        <path
          d="M112 8C120 8 125 12 135 12C145 12 150 8 158 8"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          fill="none"
        />
        
        {/* Left end ornament */}
        <circle cx="38" cy="8" r="3" fill="#D4AF37" fillOpacity="0.5" />
        <circle cx="32" cy="8" r="1.5" fill="#D4AF37" fillOpacity="0.3" />
        
        {/* Right end ornament */}
        <circle cx="162" cy="8" r="3" fill="#D4AF37" fillOpacity="0.5" />
        <circle cx="168" cy="8" r="1.5" fill="#D4AF37" fillOpacity="0.3" />
        
        {/* Small decorative dots */}
        <circle cx="70" cy="4" r="1" fill="#D4AF37" fillOpacity="0.4" />
        <circle cx="130" cy="4" r="1" fill="#D4AF37" fillOpacity="0.4" />
        <circle cx="65" cy="12" r="1" fill="#D4AF37" fillOpacity="0.3" />
        <circle cx="135" cy="12" r="1" fill="#D4AF37" fillOpacity="0.3" />
        
        {/* Bottom decorative line */}
        <line
          x1="20"
          y1="20"
          x2="180"
          y2="20"
          stroke="#D4AF37"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
      </svg>
    );
  }
);

OrnamentalDivider.displayName = 'OrnamentalDivider';

export default OrnamentalDivider;
