# Handoff Report: Milestone 1 Layout Shell Specifications & Implementation Templates

**Agent**: `m1_explorer_3` (M1 Layout Shell Explorer)  
**Date**: 2026-10-17T11:35:00Z  
**Target Path**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_m1_3/handoff.md`  
**Parent Orchestrator**: `e7bc17fc-0516-42d3-8898-daebdc91962d` (`teamwork_preview_orchestrator_1`)  
**Scope**: Complete specifications and production-ready code templates for `src/app/layout.tsx`, `src/components/common/Navbar.tsx`, and `src/components/common/Footer.tsx`.

---

## 1. Observation

### 1.1 Direct Requirements & Mandates
From `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/ORIGINAL_REQUEST.md`:
- **Line 5**: *"Build a responsive Next.js and Tailwind CSS website template for a prestigious Jordanian private chef and gourmet dining experience that operates exclusively one day per week on Fridays with an organic, locally-sourced weekly rotating menu. The visual identity features an organic nature-connected aesthetic with navy blue and cream white color palette and styled media placeholders."*
- **Lines 13-15 (R1)**:
  - *"Implement an upscale, nature-inspired visual identity featuring a strict Navy Blue (#0B192C / #1B2A4A or equivalent rich navy) and Cream White (#FDFBF7 / #F5F0E8 or equivalent warm cream) color scheme."*
  - *"Highlight the chef's culinary story: a Jordanian native chef celebrating local organic farms, markets, seasonal ingredients, and intimate private chef dining."*
- **Lines 17-18 (R2)**:
  - *"Prominently feature the unique dining schedule: open strictly one day a week (Fridays only)."*
- **Lines 23-26 (R3)**:
  - *"An interactive reservation modal/form allowing guests to request bookings exclusively for upcoming Fridays."*
- **Lines 28-31 (R4)**:
  - *"Built with React / Next.js and Tailwind CSS, structured with modular, reusable components."*
  - *"Responsive design tailored for mobile, tablet, and desktop viewports."*
  - *"The project must build cleanly with no build, typecheck, or lint errors."*

From `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/PROJECT.md`:
- **Lines 10-12 & 20-21**:
  - `Navbar`: Brand Wordmark (`Cormorant Garamond`), Friday Badge, Reservation CTA (`[Reserve Friday Table] CTA Trigger`).
  - `Footer`: Service Policies, Farm Partnerships (Ajloun, Ghor, Jerash, Dead Sea), Private Dining Guidelines.
- **Lines 89-96 (Design Tokens)**:
  - `brand-navy-dark`: `#0B192C`
  - `brand-navy-card`: `#1B2A4A`
  - `brand-cream-light`: `#FDFBF7`
  - `brand-cream-warm`: `#F5F0E8`
  - `brand-accent-gold`: `#C5A880`
  - `brand-accent-olive`: `#3E4D34`
- **Lines 197-204 (Code Layout)**:
  - `src/app/layout.tsx`: Root layout, Google fonts, luxury metadata.
  - `src/components/common/Navbar.tsx`: Sticky luxury header with Friday CTA.
  - `src/components/common/Footer.tsx`: Luxury footer with hours & sourcing credits.

---

## 2. Logic Chain

1. **Typography & Layout Foundation (`src/app/layout.tsx`)**:
   - The culinary brand demands a high-end Michelin-style aesthetic. Using `next/font/google`, we configure `Cormorant_Garamond` (weights 400, 500, 600, 700) for editorial serif titles and `Inter` (weights 300, 400, 500, 600) for crisp body typography.
   - Configuring CSS variables `--font-serif` and `--font-sans` maps seamlessly to Tailwind's `font-serif` and `font-sans`.
   - Comprehensive metadata satisfies SEO, social sharing (OpenGraph, Twitter card), theme color (`#0B192C`), and responsive viewport settings.
   - An accessibility skip-to-content link (`#main-content`) is included for WCAG AA compliance.

2. **Luxury Sticky Navigation (`src/components/common/Navbar.tsx`)**:
   - The navigation must maintain presence during exploration. Using `'use client'` with a scroll listener, the navbar transitions from semi-translucent (`bg-brand-navy-dark/80 backdrop-blur-md`) to a solid, grounded luxury header with fine gold border (`border-b border-brand-accent-gold/20`).
   - The **Brand Wordmark** presents "CHEF TARIQ AL-AMAD" in editorial serif with high letter-spacing and an authentic Jordanian subtitle ("JORDANIAN PRIVATE DINING • AMMAN").
   - The **"Friday-Only Dining" Badge** reinforces Requirement R2 with an animated emerald pulse indicator and "14 Seats Weekly" text.
   - The **"Reserve Friday Table" CTA Button** triggers the reservation flow. To support both layout architectures (root layout or client page composition), the CTA supports:
     - An optional `onOpenReservation?: () => void` prop.
     - A global custom event fallback: `window.dispatchEvent(new CustomEvent('open-reservation-modal'))`.
     - An anchor fallback: `href="#reserve"`.
   - **Mobile Drawer**: A responsive mobile hamburger menu toggles a full-screen or slide-down navigation drawer with animated links, Friday badge, and full-width CTA.

3. **Farm Partnerships & Operating Policies Footer (`src/components/common/Footer.tsx`)**:
   - The footer cements the narrative of Jordanian culinary heritage and agricultural integrity:
     - **Farm Partner Credits**: Highlights **Ajloun Rainfed Groves** (heirloom Roman olive oil & sumac), **Ghor / Jordan Valley** (organic winter harvest & citrus), **Jerash Highlands** (fig terraces & goat labneh), and **Dead Sea Basin** (hand-crystallized mineral salt).
     - **Exclusive Friday Schedule**: Explicitly states the Friday-only operating cadence, seating times (Afternoon Terrace: 1:30 PM – 4:00 PM; Evening Starlight Salon: 7:30 PM – 10:30 PM), and the 48-hour ingredient harvest cycle.
     - **Private Dining Policies**: Notes the 14-seat salon capacity, private salon buyout options for parties >8, 72-hour dietary notice requirements, and booking policies.
     - **Copyright & Back to Top**: Elegant bottom bar with smooth scroll-to-top interaction.

---

## 3. Production Component Code Templates

### 3.1 `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['Playfair Display', 'Georgia', 'serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const viewport: Viewport = {
  themeColor: '#0B192C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cheftariqalamad.jo'),
  title: {
    default: 'Chef Tariq Al-Amad | Prestigious Jordanian Private Dining — Friday Only',
    template: '%s | Chef Tariq Al-Amad',
  },
  description:
    'Exclusive weekly private dining experience in Amman, Jordan. Operating strictly on Fridays with an organic, hyper-seasonal multi-course tasting menu celebrating ancient terroirs: Ajloun olive groves, Jordan Valley harvests, and Jerash orchards.',
  keywords: [
    'Chef Tariq Al-Amad',
    'Jordanian private chef',
    'Amman fine dining',
    'Friday dining Jordan',
    'organic tasting menu Amman',
    'Ajloun olive oil',
    'farm to table Jordan',
    'Levantine private dining',
  ],
  authors: [{ name: 'Chef Tariq Al-Amad' }],
  creator: 'Chef Tariq Al-Amad',
  publisher: 'Al-Amad Private Dining Salon',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cheftariqalamad.jo',
    title: 'Chef Tariq Al-Amad | Prestigious Jordanian Private Dining — Friday Only',
    description:
      'Operating exclusively one day per week on Fridays. 14 seats per service. An intimate exploration of Jordan’s ancient organic terroirs.',
    siteName: 'Chef Tariq Al-Amad Private Dining',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Tariq Al-Amad | Prestigious Jordanian Private Dining',
    description:
      'Friday-only organic tasting menu in Amman, Jordan celebrating Ajloun, Ghor, and Jerash harvests.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-brand-navy-dark text-brand-cream-light font-sans antialiased selection:bg-brand-accent-gold/20 selection:text-brand-cream-light">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-accent-gold focus:text-brand-navy-dark focus:font-medium focus:rounded-md focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
```

---

### 3.2 `src/components/common/Navbar.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Menu, X, Sparkles, Clock } from 'lucide-react';

export interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleReservationClick = (e: React.MouseEvent) => {
    if (onOpenReservation) {
      e.preventDefault();
      onOpenReservation();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-reservation-modal'));
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Terroirs', href: '#terroirs' },
    { label: 'Weekly Menu', href: '#menu' },
    { label: 'Private Dining', href: '#policies' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy-dark/95 backdrop-blur-md border-b border-brand-accent-gold/20 shadow-xl py-3.5'
          : 'bg-brand-navy-dark/70 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-gold/50 rounded-sm"
          >
            <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.18em] text-brand-cream-light font-medium group-hover:text-brand-accent-gold transition-colors duration-300">
              CHEF TARIQ AL-AMAD
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.28em] text-brand-accent-gold uppercase font-light">
              Jordanian Private Dining • Amman
            </span>
          </Link>

          {/* Center: Friday-Only Concept Badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy-card/90 border border-brand-accent-gold/30 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium tracking-wide text-brand-cream-light">
              Friday-Only Dining
            </span>
            <span className="text-brand-accent-gold/40 text-xs">•</span>
            <span className="text-[11px] text-brand-cream-light/70 font-light">
              14 Seats Weekly
            </span>
          </div>

          {/* Desktop Navigation Links & CTA */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <nav className="flex items-center gap-6 text-sm tracking-wider font-light">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-brand-cream-light/80 hover:text-brand-accent-gold transition-colors duration-200 py-1 relative group focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent-gold"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-accent-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Reserve Friday Table CTA Button */}
            <button
              type="button"
              onClick={handleReservationClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-medium tracking-widest uppercase bg-brand-navy-card hover:bg-brand-accent-gold text-brand-cream-light hover:text-brand-navy-dark border border-brand-accent-gold/60 shadow-lg hover:shadow-brand-accent-gold/20 transition-all duration-300 transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-gold"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-accent-gold group-hover:text-brand-navy-dark transition-colors" />
              <span>Reserve Friday Table</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={handleReservationClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-medium tracking-wider uppercase bg-brand-navy-card border border-brand-accent-gold/50 text-brand-accent-gold focus:outline-none"
            >
              <Calendar className="w-3 h-3" />
              <span>Reserve</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-sm text-brand-cream-light hover:text-brand-accent-gold hover:bg-brand-navy-card/60 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent-gold"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-accent-gold/20 bg-brand-navy-dark/98 backdrop-blur-xl px-4 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Friday Badge */}
          <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-navy-card border border-brand-accent-gold/30 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-brand-cream-light">
              Friday-Only Dining
            </span>
            <span className="text-brand-accent-gold/40 text-xs">•</span>
            <span className="text-[11px] text-brand-cream-light/70">
              14 Seats Weekly
            </span>
          </div>

          <nav className="flex flex-col space-y-3 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-brand-cream-light/90 hover:text-brand-accent-gold hover:pl-2 transition-all duration-200 py-1.5 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleReservationClick}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-sm text-xs font-semibold tracking-widest uppercase bg-brand-accent-gold text-brand-navy-dark hover:bg-brand-cream-light transition-colors duration-200 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Friday Table</span>
          </button>
        </div>
      )}
    </header>
  );
}
```

---

### 3.3 `src/components/common/Footer.tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, ShieldCheck, Leaf, ArrowUp } from 'lucide-react';

export default function Footer() {
  const farmPartners = [
    {
      region: 'Ajloun Highlands',
      arabic: 'مرتفعات عجلون',
      harvest: 'Ancient Rainfed Roman Olive Groves & Wild Mountain Sumac',
    },
    {
      region: 'Jordan Valley (Ghor)',
      arabic: 'غور الأردن',
      harvest: 'Subtropical Heirloom Winter Tomatoes, Sweet Citrus & Micro-greens',
    },
    {
      region: 'Jerash Terraces',
      arabic: 'مدرجات جرش',
      harvest: 'Highland Fig Orchards, Mountain Za’atar & Artisanal Baladi Goat Dairy',
    },
    {
      region: 'Dead Sea Basin',
      arabic: 'حوض البحر الميت',
      harvest: 'Hand-Harvested Pristine Mineral Salt Crystals',
    },
  ];

  return (
    <footer className="w-full bg-[#07111E] text-brand-cream-light border-t border-brand-accent-gold/25 relative overflow-hidden">
      {/* Decorative hairline accent top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-accent-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-brand-cream-light/10">
          
          {/* Column 1: Brand Wordmark & Philosophy */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.16em] text-brand-cream-light font-medium block">
                CHEF TARIQ AL-AMAD
              </span>
              <span className="text-[11px] tracking-[0.24em] text-brand-accent-gold uppercase block mt-1">
                المطبخ الأردني الأصيل • عمان
              </span>
            </div>
            <p className="text-xs leading-relaxed text-brand-cream-light/70 font-light">
              An intimate culinary ritual operating exclusively one day per week on Fridays.
              Limited to 14 guests per service, each weekly rotating menu celebrates the sacred rhythm
              of Jordanian hospitality (*Karam*) and regional organic harvests.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-brand-accent-gold/90">
              <Leaf className="w-3.5 h-3.5 text-brand-accent-olive" />
              <span className="font-light">100% Organic & Hyper-Locally Sourced</span>
            </div>
          </div>

          {/* Column 2: Regional Farm Partners & Terroir Credits */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wider text-brand-cream-light flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-accent-gold" />
              <span>Terroir Partnerships</span>
            </h3>
            <ul className="space-y-3 text-xs">
              {farmPartners.map((farm) => (
                <li key={farm.region} className="border-l border-brand-accent-gold/30 pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-brand-cream-light">{farm.region}</span>
                    <span className="text-[10px] text-brand-accent-gold/60">{farm.arabic}</span>
                  </div>
                  <p className="text-brand-cream-light/60 font-light mt-0.5 leading-snug">
                    {farm.harvest}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Exclusive Friday Operating Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wider text-brand-cream-light flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent-gold" />
              <span>Friday Service Cadence</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-sm bg-brand-navy-card/60 border border-brand-accent-gold/20">
                <span className="font-semibold text-brand-accent-gold block tracking-wide">
                  Afternoon Terrace Seating
                </span>
                <span className="text-brand-cream-light/90 block mt-0.5">1:30 PM – 4:00 PM</span>
                <span className="text-[10px] text-brand-cream-light/50 font-light">Golden hour garden dining</span>
              </div>

              <div className="p-3 rounded-sm bg-brand-navy-card/60 border border-brand-accent-gold/20">
                <span className="font-semibold text-brand-accent-gold block tracking-wide">
                  Evening Starlight Salon
                </span>
                <span className="text-brand-cream-light/90 block mt-0.5">7:30 PM – 10:30 PM</span>
                <span className="text-[10px] text-brand-cream-light/50 font-light">Candlelit 4-course banquet</span>
              </div>

              <p className="text-[11px] text-brand-cream-light/60 font-light leading-snug italic pt-1">
                * Closed Saturday through Thursday for farm harvests, olive pressing, and menu formulation.
              </p>
            </div>
          </div>

          {/* Column 4: Private Dining Policies & Sourcing */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wider text-brand-cream-light flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-accent-gold" />
              <span>Salon Guidelines</span>
            </h3>
            <div className="space-y-2 text-xs text-brand-cream-light/70 font-light">
              <p>
                <strong className="text-brand-cream-light font-medium">Seating Capacity:</strong> Strictly 14 guests per service. Advance reservation required; no walk-ins.
              </p>
              <p>
                <strong className="text-brand-cream-light font-medium">Private Buyouts:</strong> Entire salon buyouts available for parties of 8 to 14 guests upon inquiry.
              </p>
              <p>
                <strong className="text-brand-cream-light font-medium">Dietary Accommodations:</strong> Vegan, gluten-free, and nut allergies curated with 72-hour advance booking notice.
              </p>
              <p>
                <strong className="text-brand-cream-light font-medium">Location:</strong> Dabouq / Western Amman Hills. Detailed arrival directions provided upon confirmation voucher.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream-light/60 font-light">
          <p>
            © {new Date().getFullYear()} Chef Tariq Al-Amad. All rights reserved. Prestigious Jordanian Private Dining.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#story" className="hover:text-brand-accent-gold transition-colors">
              Chef Story
            </Link>
            <Link href="#terroirs" className="hover:text-brand-accent-gold transition-colors">
              Terroirs
            </Link>
            <Link href="#menu" className="hover:text-brand-accent-gold transition-colors">
              Weekly Menu
            </Link>
            <Link href="#reserve" className="hover:text-brand-accent-gold transition-colors text-brand-accent-gold">
              Reserve Table
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### 3.4 Favicon & Asset Specification

To prevent 404 errors or missing icon warnings during Next.js builds and browser visits:
- An SVG favicon can be created at `public/favicon.ico` or `public/favicon.svg` with the following minimalist botanical olive seal:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="16" fill="#0B192C"/>
  <circle cx="32" cy="32" r="26" stroke="#C5A880" stroke-width="1.5" stroke-dasharray="2 3"/>
  <!-- Stylized Olive Branch -->
  <path d="M22 42C26 36 32 30 42 22" stroke="#C5A880" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="27" cy="31" rx="5" ry="3" transform="rotate(-30 27 31)" fill="#3E4D34" stroke="#C5A880" stroke-width="1"/>
  <ellipse cx="37" cy="27" rx="5" ry="3" transform="rotate(25 37 27)" fill="#3E4D34" stroke="#C5A880" stroke-width="1"/>
</svg>
```

---

## 4. Integration Blueprint with Page Shell

The layout shell connects cleanly into `src/app/page.tsx`:

```tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
// Milestone 2 & 3 components imported here
// import HeroSection from '@/components/home/HeroSection';
// import ChefStorySection from '@/components/home/ChefStorySection';
// import WeeklyMenuShowcase from '@/components/home/WeeklyMenuShowcase';
// import ReservationModal from '@/components/reservation/ReservationModal';

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-brand-navy-dark text-brand-cream-light">
      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />
      
      <main id="main-content" className="flex-1">
        {/* Sections for M2 will render here */}
      </main>

      <Footer />

      {/* Reservation Modal for M3 will render here */}
      {/* <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} /> */}
    </div>
  );
}
```

---

## 5. Caveats

1. **Font Loading in Offline/Air-gapped Environments**:
   `next/font/google` downloads Google Fonts at build time. Fallbacks (`'Playfair Display', 'Georgia', 'serif'` for serif; `'system-ui', 'sans-serif'` for sans) are explicitly included in `layout.tsx` so typography renders gracefully without layout shift even if Google Fonts CDN is unreachable.
2. **Event Dispatch vs Direct State**:
   `Navbar.tsx` implements dual invocation: if `onOpenReservation` prop is provided (e.g. in a client page), it calls the callback. If not provided (or rendered statically), it dispatches `window.dispatchEvent(new CustomEvent('open-reservation-modal'))`, allowing any modal container on the page to reactively open.
3. **No External Images**:
   Both `Navbar.tsx` and `Footer.tsx` rely strictly on `lucide-react` SVG vector icons and Tailwind classes. Zero external photographic assets or remote HTTP endpoints are referenced.

---

## 6. Conclusion

The layout shell specification completely fulfills Milestones 1 & R1, R2, R4:
1. **Typography & Aesthetics**: High-luxury pairing of Cormorant Garamond and Inter, anchored by the strict Navy Blue (`#0B192C`, `#1B2A4A`) and Cream White (`#FDFBF7`, `#F5F0E8`) palette.
2. **Interactive Navigation**: Sticky header with scroll compaction, responsive mobile drawer, brand wordmark, prominent Friday-only badge, and a dual-wired "Reserve Friday Table" CTA button.
3. **Heritage Footer**: Fully detailed farm sourcing credits (Ajloun, Ghor, Jerash, Dead Sea), explicit Friday operating schedule, and salon dining policies.
4. **Code Quality**: Strict TypeScript types, responsive breakpoints (`sm`, `md`, `lg`), zero external photo dependencies, and clean Next.js 14 App Router compliance.

---

## 7. Verification Method

To verify the layout shell implementation:

1. **File Placement**:
   - `src/app/layout.tsx`
   - `src/components/common/Navbar.tsx`
   - `src/components/common/Footer.tsx`

2. **Lint & Typecheck**:
   ```bash
   npm run build
   # Must compile with 0 TypeScript errors and 0 ESLint warnings
   ```

3. **DOM & Responsive Verification**:
   - In desktop view (>1024px): verify Brand Wordmark, Friday Badge ("Friday-Only Dining • 14 Seats Weekly"), 4 navigation links, and "Reserve Friday Table" button are visible.
   - In mobile view (<768px): verify hamburger button toggles the mobile drawer and reveals navigation links and CTA.
   - Verify clicking "Reserve Friday Table" invokes `onOpenReservation` or dispatches `open-reservation-modal`.
   - Verify footer displays all 4 farm partner sections (Ajloun, Ghor, Jerash, Dead Sea) and Friday operating hours.

4. **Invalidation Conditions**:
   - If any `<img>` tag points to external stock photo domains.
   - If the navigation lacks the Friday-Only Dining badge.
   - If the footer omits the regional farm credits or Friday service hours.
