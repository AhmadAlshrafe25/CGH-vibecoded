# Project: CGH Prestigious Jordanian Private Chef Friday Dining Experience

## Architecture

A luxury, nature-connected web application built with Next.js (App Router), TypeScript, and Tailwind CSS. The system delivers an intimate private chef experience for a prestigious Jordanian native chef operating exclusively one day per week (Fridays) with an organic, locally-sourced weekly rotating menu.

```
+-----------------------------------------------------------------------------------+
|                                  Page Layout                                      |
|  +-----------------------------------------------------------------------------+  |
|  | Navbar: Brand Wordmark (Cormorant Garamond), Friday Badge, Reservation CTA   |  |
|  +-----------------------------------------------------------------------------+  |
|  | Hero Section: Exclusive Friday Cadence, Next Service Countdown, Booking CTA |  |
|  +-----------------------------------------------------------------------------+  |
|  | Chef Story & Terroir: Heritage, Ajloun Olive Groves, Ghor, Jerash, Dead Sea |  |
|  +-----------------------------------------------------------------------------+  |
|  | Weekly Menu Showcase: Rotating Editions, 4 Courses, Dietary Badges, Tabs   |  |
|  +-----------------------------------------------------------------------------+  |
|  | Styled Nature Placeholders: SVG Botantical Vectors, Explicit Dimensions     |  |
|  +-----------------------------------------------------------------------------+  |
|  | Footer: Service Policies, Farm Partnerships, Private Dining Guidelines      |  |
+-----------------------------------------------------------------------------------+
                                          |
                         [Reserve Friday Table] CTA Trigger
                                          v
+-----------------------------------------------------------------------------------+
|                        Interactive Reservation Modal                              |
|  +-----------------------------------------------------------------------------+  |
|  | Friday Date Picker: Non-Fridays disabled algorithmically (Day === 5 only)   |  |
|  | Seating Slot: Afternoon Terrace (1:30 PM) vs Evening Salon (7:30 PM)        |  |
|  | Guest Stepper: 1 to 8 guests (Private buyout alert for >8)                   |  |
|  | Contact Information: Name, Email, Phone, Dietary Notes & Allergies         |  |
|  | Real-Time Client Validation -> Instant Error Feedback                      |  |
|  +-----------------------------------------------------------------------------+  |
|  | Submission -> Simulated Confirmation Voucher Screen (#JO-FRI-XXXX)          |  |
+-----------------------------------------------------------------------------------+
```

### Core Design System & Brand Palette
- **Strict Navy Blue**: `#0B192C` (Primary background for dark sections), `#1B2A4A` (Secondary slate navy for cards, borders, buttons)
- **Strict Cream White**: `#FDFBF7` (Primary background for light sections, typography on dark), `#F5F0E8` (Warm linen cream for card canvas, badges)
- **Subtle Accents**: `#C5A880` (Artisanal gold border/badge accents), `#3E4D34` (Organic olive leaf green)
- **Zero External Images**: All imagery rendered via `StyledPlaceholder.tsx` with nature-themed SVG vectors, descriptive labels, and visible dimensions (e.g., `[ 1200 × 800 • Ajloun Ancient Olive Grove ]`).

---

## Feature Inventory

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Strict Navy & Cream Palette | Visual theme enforcing Navy (#0B192C/#1B2A4A) & Cream (#FDFBF7/#F5F0E8) tokens across all elements | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Typography & Editorial Hierarchy | Editorial serif titles paired with crisp modern sans-serif body copy | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Styled SVG Placeholders | Nature-themed vector graphics with labels and dimensions; 0 remote photo dependencies | M1 | ORIGINAL_REQUEST §R1 |
| 4 | Responsive Layout Shell | High-luxury sticky Navbar with Friday CTA, base container, and Footer | M1 | ORIGINAL_REQUEST §R1, §R4 |
| 5 | Environment Scaffolding | Node.js user-space setup, Next.js App Router, Tailwind CSS, TypeScript, Vitest config | M1 | ORIGINAL_REQUEST §R4 |
| 6 | Chef Culinary Narrative | Storytelling section celebrating Jordanian native chef, Levantine hospitality (*Karam*) | M2 | ORIGINAL_REQUEST §R1 |
| 7 | Regional Terroir Farm Sourcing | Showcase of Ajloun olive groves, Jordan Valley organic basin, Jerash terraces, Dead Sea salt | M2 | ORIGINAL_REQUEST §R1 |
| 8 | Exclusive Friday Cadence Highlight | Hero banner and visual highlights indicating exclusive Friday operating schedule | M2 | ORIGINAL_REQUEST §R2 |
| 9 | 4-Course Weekly Menu Showcase | Starters, Mains, Dessert, Beverage Pairings with course descriptions and sourcing notes | M2 | ORIGINAL_REQUEST §R2 |
| 10 | Dietary Indicators & Badges | Visual pill badges for Organic, Vegan, Vegetarian, Gluten-Free on all menu dishes | M2 | ORIGINAL_REQUEST §R2 |
| 11 | Dynamic Multi-Week Menu Toggle | Easily updatable TypeScript schema allowing toggling between weekly editions | M2 | ORIGINAL_REQUEST §R2 |
| 12 | Course & Dietary Filter Tabs | Client-side tab filters allowing guests to explore specific courses or dietary options | M2 | ORIGINAL_REQUEST §R2 |
| 13 | Interactive Reservation Modal | Accessible modal container with backdrop blur, keyboard ESC dismissal, and focus trapping | M3 | ORIGINAL_REQUEST §R3 |
| 14 | Strict Friday-Only Date Picker | Interactive date selector algorithmically disabling all non-Friday days and past dates | M3 | ORIGINAL_REQUEST §R3 |
| 15 | Seating Time Slot Selector | Choice between Afternoon Terrace Seating (1:30 PM) and Evening Starlight Salon (7:30 PM) | M3 | ORIGINAL_REQUEST §R3 |
| 16 | Guest Count Stepper | Party size selector (1 to 8 guests) with private salon buyout notice for larger groups | M3 | ORIGINAL_REQUEST §R3 |
| 17 | Real-Time Form Validation | Inline validation with immediate feedback for name, email, phone, date, and slots | M3 | ORIGINAL_REQUEST §R3 |
| 18 | Simulated Confirmation Receipt | Digital booking voucher with unique reference `#JO-FRI-XXXX`, booking summary, and details | M3 | ORIGINAL_REQUEST §R3 |
| 19 | Requirement-Driven E2E Suite | 4-tier comprehensive opaque-box test suite (Tiers 1-4) published via `TEST_READY.md` | E2E Track | ORIGINAL_REQUEST Acceptance |
| 20 | Final Integration & Gate Pass | 100% pass of E2E test suite, zero-error production build (`npm run build`), zero image leak audit | M4 | ORIGINAL_REQUEST Acceptance |
| 21 | Adversarial Hardening (Tier 5) | White-box stress testing, boundary condition verification, and robustness hardening | M4 | Project Pattern |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation, Design System & Styled Placeholders | Node.js user-space setup; Next.js 14 App Router + Tailwind CSS; Navy & Cream color tokens; `StyledPlaceholder.tsx` SVG system; Layout, `Navbar.tsx`, `Footer.tsx` | none | PLANNED |
| M2 | Jordanian Culinary Story & Dynamic Weekly Menu | Chef Tariq Al-Amad heritage & terroir farm sourcing; Friday cadence hero; `types/menu.ts`, `data/weeklyMenuData.ts`; `WeeklyMenuShowcase.tsx` with 4 courses, dietary badges, week toggling | M1 | PLANNED |
| M3 | Friday-Only Reservation Engine & Confirmation Receipt | `dateUtils.ts` (strictly day === 5); `ReservationModal.tsx`; `FridayDatePicker.tsx`; `TimeSlotSelector.tsx`; `GuestCounter.tsx`; Client validation; `ConfirmationReceipt.tsx` voucher | M1, M2 | PLANNED |
| E2E | Requirement-Driven E2E Testing Suite | Design and build independent 4-Tier test suite (Tiers 1-4) verifying all features, edge cases, date restrictions, validation, and visual constraints; publish `TEST_READY.md` | none | PLANNED |
| M4 | Final Milestone: 100% E2E Pass & Adversarial Hardening | Phase 1: Pass 100% of E2E test suite (Tiers 1-4); Phase 2: Adversarial coverage hardening (Tier 5); verify `npm run build` exits 0 with 0 lint/type errors and 0 external photos | M1, M2, M3, E2E | PLANNED |

---

## Interface Contracts

### 1. Design Tokens & Styling Contract
- Tailwind theme extended with:
  - `brand-navy-dark`: `#0B192C`
  - `brand-navy-card`: `#1B2A4A`
  - `brand-cream-light`: `#FDFBF7`
  - `brand-cream-warm`: `#F5F0E8`
  - `brand-accent-gold`: `#C5A880`
  - `brand-accent-olive`: `#3E4D34`

### 2. Media Placeholder Contract (`src/components/common/StyledPlaceholder.tsx`)
```typescript
export interface StyledPlaceholderProps {
  label: string;
  dimensions: string; // e.g. "1200 × 800"
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9';
  motif?: 'olive_grove' | 'valley_harvest' | 'ancient_terroir' | 'plated_gourmet' | 'chef_portrait';
  variant?: 'navy' | 'cream';
  className?: string;
}
```

### 3. Weekly Menu Contract (`src/types/menu.ts`)
```typescript
export type DietaryPreference = 'organic' | 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-free';
export type CourseCategory = 'starters' | 'mains' | 'dessert' | 'pairings';

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  origin: string;
  keyIngredients: string[];
  dietary: DietaryPreference[];
  beveragePairing?: {
    name: string;
    description: string;
  };
  placeholder: {
    label: string;
    dimensions: string;
    motif: 'olive_grove' | 'valley_harvest' | 'ancient_terroir' | 'plated_gourmet';
  };
}

export interface MenuCourse {
  category: CourseCategory;
  title: string;
  arabicTitle: string;
  subtitle: string;
  items: MenuItem[];
}

export interface WeeklyMenu {
  id: string;
  weekNumber: number;
  seasonName: string;
  activeFridayDate: string; // "YYYY-MM-DD"
  activeFridayFormatted: string; // "Friday, October 23, 2026"
  themeSummary: string;
  chefTastingNotes: string;
  courses: MenuCourse[];
}
```

### 4. Reservation & Date Calculation Contract (`src/types/reservation.ts` & `src/lib/dateUtils.ts`)
```typescript
export type SeatingSlotId = 'afternoon' | 'sunset' | 'starlight';

export interface ReservationRequest {
  fridayDate: string; // Must satisfy isFriday(new Date(fridayDate)) === true
  slotId: SeatingSlotId;
  guestCount: number; // 1 to 8
  fullName: string;
  email: string;
  phone: string;
  dietaryPreferences: DietaryPreference[];
  specialNotes?: string;
}

export interface ReservationConfirmation extends ReservationRequest {
  bookingReference: string; // e.g., "JO-FRI-20261023-8492"
  status: 'confirmed';
  pricingPerGuestJOD: number;
  totalEstimateJOD: number;
  createdAt: string;
  venueAddress: string;
  arrivalInstructions: string;
}

export interface DateUtilsContract {
  getUpcomingFridays(count?: number, fromDate?: Date): Date[];
  isFriday(date: Date): boolean;
  validateFridayDate(isoDateString: string): { valid: boolean; error?: string };
  formatFridayDate(date: Date): string;
}
```

---

## Code Layout

```
/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/
├── public/                          # Static metadata icons & manifest
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind base, navy/cream theme variables
│   │   ├── layout.tsx               # Root layout, Google fonts, luxury metadata
│   │   └── page.tsx                 # Composed single-page application
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx            # Dietary badge pills
│   │   │   ├── Footer.tsx           # Luxury footer with hours & sourcing credits
│   │   │   ├── Navbar.tsx           # Sticky luxury header with Friday CTA
│   │   │   └── StyledPlaceholder.tsx# Nature-themed SVG image placeholder
│   │   ├── home/
│   │   │   ├── ChefStorySection.tsx # Jordanian chef heritage & farm partnerships
│   │   │   ├── FridayHighlight.tsx  # Exclusive Friday dining cadence highlight
│   │   │   ├── HeroSection.tsx      # Atmospheric hero with next service countdown
│   │   │   ├── MenuCourseCard.tsx   # Individual dish display with dietary badges
│   │   │   ├── SourcingMapSection.tsx# Sourcing breakdown across Ajloun, Ghor, Jerash
│   │   │   └── WeeklyMenuShowcase.tsx# Dynamic weekly menu with course tabs & week switcher
│   │   └── reservation/
│   │       ├── ConfirmationReceipt.tsx # Simulated luxury booking voucher screen
│   │       ├── FridayDatePicker.tsx    # Calendar strictly locking to upcoming Fridays
│   │       ├── GuestCounter.tsx        # Guest party size selector (1-8)
│   │       ├── ReservationForm.tsx     # Validated reservation input fields
│   │       ├── ReservationModal.tsx    # Accessible modal container with backdrop blur
│   │       └── TimeSlotSelector.tsx    # Seating slots (Afternoon, Sunset, Starlight)
│   ├── data/
│   │   ├── farmPartnersData.ts      # Jordanian organic farms data
│   │   └── weeklyMenuData.ts        # Rotating seasonal menu sets
│   ├── lib/
│   │   ├── dateUtils.ts             # Friday-only calculation and validation
│   │   └── reservationService.ts    # Form validation & simulated voucher generator
│   └── types/
│       ├── menu.ts                  # Menu & course TypeScript definitions
│       └── reservation.ts           # Reservation TypeScript definitions
├── tests/
│   ├── unit/
│   │   ├── dateUtils.test.ts        # Friday calculation & boundary tests
│   │   └── menuSchema.test.ts       # Menu data structure & dietary badge validation
│   ├── integration/
│   │   ├── weeklyMenu.test.tsx      # Menu course rendering & week switching
│   │   └── reservationModal.test.tsx# Modal open/close & validation triggers
│   └── e2e/
│       ├── bookingFlow.spec.ts      # Complete user journey & non-Friday rejection
│       └── responsiveLayout.spec.ts # Mobile, tablet, and desktop viewport checks
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
