'use client';

import React from 'react';
import { StyledPlaceholder } from '@/components/common/StyledPlaceholder';

export interface HeroSectionProps {
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-6">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#3E4D34]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Cadence Announcement Pill */}
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-[#C5A880]/40 bg-[#1B2A4A]/60 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FDFBF7]">
              Exclusive Dining Cadence: One Day Weekly • Every Friday
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.15]">
            Rooted in Soil.{' '}
            <span className="italic font-normal text-[#C5A880] block sm:inline">
              Offered Only on Fridays.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#F5F0E8]/80 max-w-2xl font-light leading-relaxed">
            Welcome to the private sanctuary of <strong>Chef Tariq Al-Amad</strong>. In the quiet foothills of Jordan, our doors unlock once every seven days. Every dish is a living tribute to century-old olive groves, local farmers’ markets, and seasonal organic harvests.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 pt-2 pb-2 border-y border-[#1B2A4A] w-full max-w-lg">
            <div>
              <span className="block font-serif text-2xl font-bold text-[#FDFBF7]">1 Day</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A880]">Every Friday</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-[#FDFBF7]">16 Seats</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A880]">Intimate Salon</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-[#FDFBF7]">100%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3B899]">Organic Terroir</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={onOpenReservation}
              className="px-8 py-4 rounded font-semibold text-sm bg-[#C5A880] text-[#0B192C] hover:bg-[#FDFBF7] transition-all shadow-xl hover:shadow-[#C5A880]/20 text-center cursor-pointer active:scale-95"
            >
              Request Friday Reservation
            </button>
            <a
              href="#menu"
              className="px-8 py-4 rounded font-medium text-sm border border-[#1B2A4A] text-[#F5F0E8] hover:border-[#C5A880] hover:text-[#C5A880] transition-all text-center"
            >
              View This Week’s Menu
            </a>
          </div>
        </div>

        {/* Right Column: Styled Placeholder Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl p-2 bg-[#1B2A4A]/40 border border-[#1B2A4A] shadow-2xl backdrop-blur-sm">
            <StyledPlaceholder
              label="Hearthside Plated Tasting Course — Ajloun Wood Smoke"
              dimensions="1200 × 800"
              aspectRatio="4/3"
              motif="plated_gourmet"
              variant="navy"
            />
            {/* Terroir badge overlay */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-lg bg-[#0B192C] border border-[#C5A880]/50 shadow-xl flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-[#3E4D34] border border-[#A3B899]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#F5F0E8]">
                First Press Nabali Harvest 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
