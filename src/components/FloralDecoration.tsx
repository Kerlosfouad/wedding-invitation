/**
 * FloralDecoration — SVG roses & leaves in burgundy/gold palette
 * Mirrors the dark floral style in the reference image but with the app's color scheme.
 */

interface FloralDecorationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
  flip?: boolean;
}

export default function FloralDecoration({
  position = 'bottom-left',
  size = 'md',
  opacity = 0.85,
  className = '',
  flip = false,
}: FloralDecorationProps) {
  const sizes = { sm: 180, md: 280, lg: 400 };
  const w = sizes[size];

  const positionClasses: Record<string, string> = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={`absolute pointer-events-none select-none ${positionClasses[position]} ${className}`}
      style={{ opacity, width: w, height: w }}
    >
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        <defs>
          <radialGradient id="roseGrad1" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#C0001A" />
            <stop offset="60%" stopColor="#7A000F" />
            <stop offset="100%" stopColor="#3D000A" />
          </radialGradient>
          <radialGradient id="roseGrad2" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#A3162B" />
            <stop offset="60%" stopColor="#5A000F" />
            <stop offset="100%" stopColor="#3D000A" />
          </radialGradient>
          <radialGradient id="roseGrad3" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#8B0015" />
            <stop offset="100%" stopColor="#3D000A" />
          </radialGradient>
          <radialGradient id="budGrad" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A0008" />
            <stop offset="100%" stopColor="#1A0005" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3D000A" />
            <stop offset="100%" stopColor="#200006" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A0005" />
            <stop offset="100%" stopColor="#3D000A" />
          </linearGradient>
        </defs>

        {/* ── Stems ── */}
        <path d="M60 400 Q80 320 120 280 Q150 250 180 220" stroke="url(#stemGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M30 400 Q50 350 70 310 Q90 270 110 240" stroke="url(#stemGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M100 400 Q130 360 160 330 Q190 300 210 270" stroke="url(#stemGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M150 400 Q170 370 200 340 Q230 310 250 280" stroke="url(#stemGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

        {/* ── Large leaves ── */}
        <ellipse cx="95" cy="310" rx="38" ry="16" fill="url(#leafGrad1)" transform="rotate(-40 95 310)"/>
        <ellipse cx="140" cy="350" rx="32" ry="13" fill="url(#leafGrad2)" transform="rotate(-55 140 350)"/>
        <ellipse cx="55" cy="355" rx="28" ry="11" fill="url(#leafGrad1)" transform="rotate(-25 55 355)"/>
        <ellipse cx="175" cy="310" rx="30" ry="12" fill="url(#leafGrad2)" transform="rotate(-50 175 310)"/>
        <ellipse cx="220" cy="290" rx="26" ry="10" fill="url(#leafGrad1)" transform="rotate(-60 220 290)"/>
        <ellipse cx="130" cy="280" rx="24" ry="9" fill="url(#leafGrad2)" transform="rotate(-35 130 280)"/>

        {/* ── Small accent leaves ── */}
        <ellipse cx="165" cy="240" rx="18" ry="7" fill="url(#leafGrad1)" transform="rotate(-65 165 240)"/>
        <ellipse cx="80" cy="280" rx="16" ry="6" fill="url(#leafGrad2)" transform="rotate(-20 80 280)"/>
        <ellipse cx="200" cy="260" rx="15" ry="6" fill="url(#leafGrad1)" transform="rotate(-70 200 260)"/>

        {/* ── Leaf veins ── */}
        <path d="M75 318 Q95 310 115 302" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" fill="none"/>
        <path d="M120 356 Q140 350 160 344" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" fill="none"/>
        <path d="M42 360 Q55 355 68 350" stroke="rgba(212,175,55,0.12)" strokeWidth="0.8" fill="none"/>

        {/* ── Main rose (large, center-left) ── */}
        <g transform="translate(120, 220)">
          {/* Outer petals */}
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(0)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(45)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(90)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(135)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(180)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(225)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(270)"/>
          <ellipse cx="0" cy="-38" rx="22" ry="30" fill="url(#roseGrad1)" transform="rotate(315)"/>
          {/* Mid petals */}
          <ellipse cx="0" cy="-26" rx="17" ry="22" fill="url(#roseGrad2)" transform="rotate(22)"/>
          <ellipse cx="0" cy="-26" rx="17" ry="22" fill="url(#roseGrad2)" transform="rotate(67)"/>
          <ellipse cx="0" cy="-26" rx="17" ry="22" fill="url(#roseGrad2)" transform="rotate(112)"/>
          <ellipse cx="0" cy="-26" rx="17" ry="22" fill="url(#roseGrad2)" transform="rotate(157)"/>
          <ellipse cx="0" cy="-26" rx="17" ry="22" fill="url(#roseGrad2)" transform="rotate(202)"/>
          <ellipse cx="0" cy="-26" rx="17" ry="22" fill="url(#roseGrad2)" transform="rotate(247)"/>
          {/* Inner petals */}
          <ellipse cx="0" cy="-16" rx="12" ry="16" fill="url(#roseGrad3)" transform="rotate(30)"/>
          <ellipse cx="0" cy="-16" rx="12" ry="16" fill="url(#roseGrad3)" transform="rotate(90)"/>
          <ellipse cx="0" cy="-16" rx="12" ry="16" fill="url(#roseGrad3)" transform="rotate(150)"/>
          <ellipse cx="0" cy="-16" rx="12" ry="16" fill="url(#roseGrad3)" transform="rotate(210)"/>
          <ellipse cx="0" cy="-16" rx="12" ry="16" fill="url(#roseGrad3)" transform="rotate(270)"/>
          {/* Center */}
          <circle cx="0" cy="0" r="10" fill="#2A0008"/>
          <circle cx="0" cy="0" r="6" fill="#1A0005"/>
          {/* Gold shimmer */}
          <circle cx="-2" cy="-2" r="2" fill="rgba(212,175,55,0.4)"/>
        </g>

        {/* ── Second rose (medium, right) ── */}
        <g transform="translate(230, 255)">
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(0)"/>
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(51)"/>
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(102)"/>
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(153)"/>
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(204)"/>
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(255)"/>
          <ellipse cx="0" cy="-30" rx="18" ry="24" fill="url(#roseGrad2)" transform="rotate(306)"/>
          <ellipse cx="0" cy="-20" rx="13" ry="17" fill="url(#roseGrad3)" transform="rotate(25)"/>
          <ellipse cx="0" cy="-20" rx="13" ry="17" fill="url(#roseGrad3)" transform="rotate(85)"/>
          <ellipse cx="0" cy="-20" rx="13" ry="17" fill="url(#roseGrad3)" transform="rotate(145)"/>
          <ellipse cx="0" cy="-20" rx="13" ry="17" fill="url(#roseGrad3)" transform="rotate(205)"/>
          <ellipse cx="0" cy="-20" rx="13" ry="17" fill="url(#roseGrad3)" transform="rotate(265)"/>
          <circle cx="0" cy="0" r="8" fill="#2A0008"/>
          <circle cx="0" cy="0" r="4" fill="#1A0005"/>
          <circle cx="-1" cy="-1" r="1.5" fill="rgba(212,175,55,0.4)"/>
        </g>

        {/* ── Third rose (small bud, lower) ── */}
        <g transform="translate(70, 295)">
          <ellipse cx="0" cy="-22" rx="14" ry="18" fill="url(#roseGrad1)" transform="rotate(0)"/>
          <ellipse cx="0" cy="-22" rx="14" ry="18" fill="url(#roseGrad1)" transform="rotate(60)"/>
          <ellipse cx="0" cy="-22" rx="14" ry="18" fill="url(#roseGrad1)" transform="rotate(120)"/>
          <ellipse cx="0" cy="-22" rx="14" ry="18" fill="url(#roseGrad1)" transform="rotate(180)"/>
          <ellipse cx="0" cy="-22" rx="14" ry="18" fill="url(#roseGrad1)" transform="rotate(240)"/>
          <ellipse cx="0" cy="-22" rx="14" ry="18" fill="url(#roseGrad1)" transform="rotate(300)"/>
          <ellipse cx="0" cy="-14" rx="9" ry="12" fill="url(#roseGrad3)" transform="rotate(30)"/>
          <ellipse cx="0" cy="-14" rx="9" ry="12" fill="url(#roseGrad3)" transform="rotate(120)"/>
          <ellipse cx="0" cy="-14" rx="9" ry="12" fill="url(#roseGrad3)" transform="rotate(210)"/>
          <ellipse cx="0" cy="-14" rx="9" ry="12" fill="url(#roseGrad3)" transform="rotate(300)"/>
          <circle cx="0" cy="0" r="6" fill="#2A0008"/>
        </g>

        {/* ── Gold bud accent ── */}
        <g transform="translate(185, 235)">
          <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#budGrad)" transform="rotate(0)"/>
          <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#budGrad)" transform="rotate(72)"/>
          <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#budGrad)" transform="rotate(144)"/>
          <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#budGrad)" transform="rotate(216)"/>
          <ellipse cx="0" cy="-14" rx="8" ry="12" fill="url(#budGrad)" transform="rotate(288)"/>
          <circle cx="0" cy="0" r="5" fill="#B8960F"/>
        </g>

        {/* ── Small scattered petals ── */}
        <ellipse cx="160" cy="380" rx="8" ry="5" fill="url(#roseGrad1)" transform="rotate(-20 160 380)" opacity="0.6"/>
        <ellipse cx="200" cy="390" rx="6" ry="4" fill="url(#roseGrad2)" transform="rotate(15 200 390)" opacity="0.5"/>
        <ellipse cx="240" cy="370" rx="7" ry="4" fill="url(#roseGrad1)" transform="rotate(-35 240 370)" opacity="0.55"/>
        <ellipse cx="40" cy="390" rx="6" ry="4" fill="url(#roseGrad2)" transform="rotate(10 40 390)" opacity="0.5"/>

        {/* ── Gold dust dots ── */}
        <circle cx="155" cy="260" r="2" fill="rgba(212,175,55,0.5)"/>
        <circle cx="200" cy="300" r="1.5" fill="rgba(212,175,55,0.4)"/>
        <circle cx="100" cy="250" r="1.5" fill="rgba(212,175,55,0.45)"/>
        <circle cx="250" cy="310" r="1" fill="rgba(212,175,55,0.35)"/>
        <circle cx="170" cy="350" r="1.5" fill="rgba(212,175,55,0.4)"/>
      </svg>
    </div>
  );
}
