import React from 'react';
import { cn } from '@/lib/utils';
import { DietaryPreference } from '@/types/menu';

export interface BadgeProps {
  label: string;
  variant?: 'gold' | 'olive' | 'navy' | 'cream';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'olive',
  className = '',
  size = 'sm',
}) => {
  const variantStyles = {
    gold: 'bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880]/40',
    olive: 'bg-[#3E4D34]/25 text-[#A3B899] border-[#3E4D34]/70',
    navy: 'bg-[#1B2A4A] text-[#FDFBF7] border-[#1B2A4A]',
    cream: 'bg-[#F5F0E8] text-[#0B192C] border-[#E2D9CC]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border tracking-wide uppercase font-sans',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
};

export const DietaryBadge: React.FC<{ type: DietaryPreference; className?: string }> = ({
  type,
  className = '',
}) => {
  const getBadgeConfig = (diet: DietaryPreference) => {
    switch (diet) {
      case 'organic':
        return { label: 'Certified Organic', variant: 'olive' as const };
      case 'vegan':
        return { label: 'Plant-Based', variant: 'olive' as const };
      case 'vegetarian':
        return { label: 'Vegetarian', variant: 'gold' as const };
      case 'gluten-free':
        return { label: 'Gluten-Free', variant: 'cream' as const };
      case 'dairy-free':
        return { label: 'Dairy-Free', variant: 'navy' as const };
      case 'nut-free':
        return { label: 'Nut-Free', variant: 'gold' as const };
      default:
        return { label: diet, variant: 'navy' as const };
    }
  };

  const config = getBadgeConfig(type);

  return <Badge label={config.label} variant={config.variant} className={className} />;
};

export default Badge;
