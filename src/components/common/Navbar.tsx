'use client';

import React from 'react';

export interface NavbarProps {
  onOpenReservation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  return (
    <header role="banner" className="sticky top-0 z-50 backdrop-blur-md border-b border-[#1B2A4A] bg-[#0B192C]/90">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main Navigation">
        {/* Brand Wordmark */}
        <a href="#" className="brand-wordmark group flex flex-col">
          <span className="font-serif text-2xl tracking-tight text-[#FDFBF7] font-bold group-hover:text-[#C5A880] transition-colors">
            Tariq Al-Amad
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-sans font-semibold">
            Private Jordanian Dining
          </span>
        </a>

        {/* Center navigation links & cadence badge */}
        <div className="nav-middle hidden md:flex items-center space-x-8">
          <span className="cadence-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3E4D34]/30 text-[#F5F0E8] border border-[#3E4D34]">
            <span className="w-2 h-2 mr-2 rounded-full bg-[#C5A880] animate-pulse" />
            Fridays Only
          </span>
          <a
            href="#story"
            className="text-sm font-medium text-[#F5F0E8]/80 hover:text-[#C5A880] transition-colors"
          >
            The Chef
          </a>
          <a
            href="#terroir"
            className="text-sm font-medium text-[#F5F0E8]/80 hover:text-[#C5A880] transition-colors"
          >
            Terroir & Story
          </a>
          <a
            href="#menu"
            className="text-sm font-medium text-[#F5F0E8]/80 hover:text-[#C5A880] transition-colors"
          >
            Weekly Menu
          </a>
          <a
            href="#guidelines"
            className="text-sm font-medium text-[#F5F0E8]/80 hover:text-[#C5A880] transition-colors"
          >
            Private Salon
          </a>
        </div>

        {/* CTA Action */}
        <div className="nav-actions flex items-center space-x-4">
          <button
            id="nav-reserve-btn"
            data-action="open-reservation-modal"
            onClick={onOpenReservation}
            className="cta-reserve px-5 py-2.5 rounded text-sm font-semibold bg-[#C5A880] text-[#0B192C] hover:bg-[#F5F0E8] transition-all shadow-lg active:scale-95"
          >
            Reserve Friday Table
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
