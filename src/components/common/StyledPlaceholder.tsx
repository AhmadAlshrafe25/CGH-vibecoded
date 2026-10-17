import React from 'react';
import { cn } from '@/lib/utils';

export interface StyledPlaceholderProps {
  label: string;
  dimensions: string; // e.g. "1200 × 800"
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9';
  motif?: 'olive_grove' | 'valley_harvest' | 'ancient_terroir' | 'plated_gourmet' | 'chef_portrait';
  variant?: 'navy' | 'cream';
  className?: string;
}

export const StyledPlaceholder: React.FC<StyledPlaceholderProps> = ({
  label,
  dimensions,
  aspectRatio = '16/9',
  motif = 'olive_grove',
  variant = 'navy',
  className = '',
}) => {
  const isNavy = variant === 'navy';
  const bgColor = isNavy ? 'bg-[#0B192C]' : 'bg-[#FDFBF7]';
  const borderColor = isNavy ? 'border-[#1B2A4A]' : 'border-[#F5F0E8]';
  const textColor = isNavy ? 'text-[#F5F0E8]' : 'text-[#0B192C]';
  const strokeColor = isNavy ? '#C5A880' : '#1B2A4A';
  const subStroke = isNavy ? '#3E4D34' : '#C5A880';

  const aspectClass = `aspect-${aspectRatio.replace('/', '-')}`;

  const renderMotifSvg = () => {
    switch (motif) {
      case 'olive_grove':
        return (
          <svg className="w-full h-full max-h-48 opacity-75" viewBox="0 0 400 240" fill="none" stroke={strokeColor}>
            {/* Terraced slopes of Ajloun */}
            <path d="M 0 190 Q 100 160 200 180 T 400 170" strokeWidth="1.5" stroke={subStroke} />
            <path d="M 0 215 Q 120 195 240 210 T 400 195" strokeWidth="1.5" stroke={strokeColor} />
            {/* Ancient Olive Tree Trunk */}
            <path d="M 195 190 C 190 145 170 125 160 100 C 175 110 195 115 200 90 C 205 115 225 110 240 100 C 230 125 210 145 205 190 Z" strokeWidth="1.5" fill={isNavy ? '#1B2A4A' : '#F5F0E8'} />
            {/* Olive Leaves & Fruit */}
            <circle cx="165" cy="85" r="18" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="235" cy="85" r="18" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="70" r="22" strokeWidth="1" />
            <circle cx="180" cy="85" r="3" fill={strokeColor} />
            <circle cx="215" cy="80" r="3" fill={strokeColor} />
            {/* Gentle Morning Sun */}
            <circle cx="320" cy="65" r="24" strokeWidth="1" strokeDasharray="2 2" stroke={strokeColor} />
          </svg>
        );

      case 'valley_harvest':
        return (
          <svg className="w-full h-full max-h-48 opacity-75" viewBox="0 0 400 240" fill="none" stroke={strokeColor}>
            {/* Jordan Valley furrowed basin */}
            <path d="M 50 200 L 200 130 L 350 200" strokeWidth="1.5" />
            <path d="M 90 200 L 200 145 L 310 200" strokeWidth="1" stroke={subStroke} />
            <path d="M 130 200 L 200 160 L 270 200" strokeWidth="1" stroke={subStroke} />
            {/* Organic Heirloom Harvest basket */}
            <path d="M 170 140 C 170 165 230 165 230 140 Z" strokeWidth="1.5" fill={isNavy ? '#1B2A4A' : '#F5F0E8'} />
            <path d="M 180 140 C 180 125 220 125 220 140" strokeWidth="1" />
            <circle cx="190" cy="135" r="5" fill={strokeColor} />
            <circle cx="205" cy="133" r="6" fill={strokeColor} />
            <circle cx="215" cy="136" r="4.5" fill={strokeColor} />
            {/* Radiant sunshine */}
            <line x1="200" y1="40" x2="200" y2="70" strokeWidth="1.5" />
            <line x1="160" y1="55" x2="180" y2="75" strokeWidth="1" />
            <line x1="240" y1="55" x2="220" y2="75" strokeWidth="1" />
          </svg>
        );

      case 'ancient_terroir':
        return (
          <svg className="w-full h-full max-h-48 opacity-75" viewBox="0 0 400 240" fill="none" stroke={strokeColor}>
            {/* Jerash Roman Colonnade homage */}
            <path d="M 90 80 L 110 80 L 105 180 L 95 180 Z" strokeWidth="1.5" />
            <line x1="85" y1="80" x2="115" y2="80" strokeWidth="2" />
            <path d="M 150 90 L 170 90 L 165 180 L 155 180 Z" strokeWidth="1.5" />
            <line x1="145" y1="90" x2="175" y2="90" strokeWidth="2" />
            {/* Dead sea salt crystal geometry */}
            <polygon points="260,130 285,115 310,130 310,160 285,175 260,160" strokeWidth="1.5" stroke={subStroke} />
            <polygon points="275,135 295,125 315,135 315,155 295,165 275,155" strokeWidth="1" />
            <line x1="50" y1="180" x2="350" y2="180" strokeWidth="1.5" stroke={strokeColor} />
          </svg>
        );

      case 'plated_gourmet':
        return (
          <svg className="w-full h-full max-h-48 opacity-75" viewBox="0 0 400 240" fill="none" stroke={strokeColor}>
            {/* Luxurious Handcrafted Ceramic Plate */}
            <ellipse cx="200" cy="155" rx="120" ry="32" strokeWidth="1.5" />
            <ellipse cx="200" cy="155" rx="85" ry="22" strokeWidth="1" strokeDasharray="3 2" stroke={subStroke} />
            {/* Cloche Dome Cover */}
            <path d="M 140 148 C 140 85 260 85 260 148" strokeWidth="1.5" fill={isNavy ? '#1B2A4A' : '#F5F0E8'} />
            <circle cx="200" cy="85" r="7" strokeWidth="1.5" />
            {/* Aromatic steam curls */}
            <path d="M 190 70 Q 185 55 195 45 T 190 25" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 210 70 Q 215 55 205 45 T 210 25" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );

      case 'chef_portrait':
        return (
          <svg className="w-full h-full max-h-48 opacity-75" viewBox="0 0 400 240" fill="none" stroke={strokeColor}>
            {/* Elegant Chef Silhouette & Jordanian Keffiyeh Pattern */}
            <circle cx="200" cy="80" r="30" strokeWidth="1.5" />
            <path d="M 145 190 C 145 140 170 120 200 120 C 230 120 255 140 255 190" strokeWidth="1.5" fill={isNavy ? '#1B2A4A' : '#F5F0E8'} />
            {/* Olive Sprig on lapel */}
            <path d="M 200 125 Q 215 140 220 155" strokeWidth="1.2" stroke={subStroke} />
            <ellipse cx="215" cy="142" rx="4" ry="2" strokeWidth="1" stroke={subStroke} />
            {/* Subtle arch framing */}
            <path d="M 110 200 L 110 80 Q 200 20 290 80 L 290 200" strokeWidth="1" strokeDasharray="4 3" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'styled-placeholder relative overflow-hidden rounded-lg border flex flex-col items-center justify-between p-6 transition-all duration-300 group hover:border-[#C5A880]/60',
        bgColor,
        borderColor,
        aspectClass,
        className
      )}
    >
      {/* Background ambient pattern */}
      <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />

      {/* Top Header: Aspect & Origin */}
      <div className="w-full flex items-center justify-between text-[11px] uppercase tracking-widest font-mono opacity-60">
        <span className={textColor}>Terroir Media Asset</span>
        <span className="text-[#C5A880]">{motif.replace('_', ' ')}</span>
      </div>

      {/* Center SVG Motif Graphic */}
      <div className="w-full flex-grow flex items-center justify-center py-4">
        {renderMotifSvg()}
      </div>

      {/* Bottom Info Bar: Label & Exact Dimensions */}
      <div className="w-full pt-3 border-t border-current/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <span className={cn('text-xs font-serif font-medium tracking-wide', textColor)}>
          {label}
        </span>
        <span className="text-[11px] font-mono tracking-wider text-[#C5A880]">
          [ {dimensions} ]
        </span>
      </div>
    </div>
  );
};

export default StyledPlaceholder;
