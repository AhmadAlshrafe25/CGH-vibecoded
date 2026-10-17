'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ChefStorySection } from '@/components/home/ChefStorySection';
import { TerroirShowcase } from '@/components/home/TerroirShowcase';
import { WeeklyMenuShowcase } from '@/components/menu/WeeklyMenuShowcase';
import { ReservationModal } from '@/components/reservation/ReservationModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="site-wrapper min-h-screen flex flex-col bg-[#0B192C] text-[#FDFBF7]">
      {/* Top Sticky Header */}
      <Navbar onOpenReservation={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" role="main" className="flex-grow">
        {/* 1. Hero Section with Exclusive Friday Cadence */}
        <HeroSection onOpenReservation={() => setIsModalOpen(true)} />

        {/* 2. Chef Story Narrative & Jordanian Terroir Heritage */}
        <ChefStorySection />

        {/* 3. Local Market & Regional Organic Farms Map */}
        <TerroirShowcase />

        {/* 4. Weekly Rotating Menu Showcase */}
        <WeeklyMenuShowcase onOpenReservation={() => setIsModalOpen(true)} />

        {/* 5. Intimate Friday Dining Guidelines & Policies */}
        <section id="policies" className="py-20 px-6 bg-[#0B192C] border-t border-[#1B2A4A]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Private Salon Protocols
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#FDFBF7]">
                The Friday Cadence &amp; Dining Guidelines
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#F5F0E8]/80">
              <div className="p-6 rounded-xl bg-[#1B2A4A]/30 border border-[#1B2A4A] space-y-2">
                <span className="font-serif text-base font-bold text-[#FDFBF7] block">
                  Why Only on Fridays?
                </span>
                <p className="text-xs font-light leading-relaxed">
                  Chef Tariq personally forages, visits each farm on Thursday, and oversees the 14-hour wood hearth cooking process. Operating exclusively on Fridays guarantees zero compromise on freshness and integrity.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#1B2A4A]/30 border border-[#1B2A4A] space-y-2">
                <span className="font-serif text-base font-bold text-[#FDFBF7] block">
                  Intimate Sixteen-Seat Capacity
                </span>
                <p className="text-xs font-light leading-relaxed">
                  Each service accommodates only 16 guests split between our afternoon sunlit terrace and evening candlelit salon, ensuring an unhurried, deeply personal journey.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#1B2A4A]/30 border border-[#1B2A4A] space-y-2">
                <span className="font-serif text-base font-bold text-[#FDFBF7] block">
                  Dietary Accommodations
                </span>
                <p className="text-xs font-light leading-relaxed">
                  Plant-based, celiac, and dairy-free guests are fully embraced. Because each dish is prepared from raw organic components, customized courses can be pre-arranged during reservation.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#1B2A4A]/30 border border-[#1B2A4A] space-y-2">
                <span className="font-serif text-base font-bold text-[#FDFBF7] block">
                  Private Full Salon Buyouts
                </span>
                <p className="text-xs font-light leading-relaxed">
                  Parties wishing to reserve the entire hearth for exclusive family celebrations or corporate dining can coordinate directly with Chef Tariq’s private concierge.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 rounded-lg font-semibold text-xs bg-[#C5A880] text-[#0B192C] hover:bg-[#FDFBF7] transition-all shadow-lg active:scale-95"
              >
                Request Your Friday Reservation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
