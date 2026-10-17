# Handoff Report: Architecture, Component Hierarchy, Data Schemas & Verification Strategy

**Agent**: `survey_explorer_3` (Architecture & Verification Explorer)  
**Date**: 2026-10-17T11:28:30Z  
**Target Path**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_survey_3/handoff.md`  
**Parent**: `e7bc17fc-0516-42d3-8898-daebdc91962d` (`teamwork_preview_orchestrator_1`)

---

## 1. Observation

### 1.1 Direct Requirements & Acceptance Criteria
From `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/ORIGINAL_REQUEST.md`:
- **Line 5**: *"Build a responsive Next.js and Tailwind CSS website template for a prestigious Jordanian private chef and gourmet dining experience that operates exclusively one day per week on Fridays with an organic, locally-sourced weekly rotating menu. The visual identity features an organic nature-connected aesthetic with navy blue and cream white color palette and styled media placeholders."*
- **Lines 13-15 (R1. Brand Identity & Visual Design)**:
  - *"Implement an upscale, nature-inspired visual identity featuring a strict Navy Blue (#0B192C / #1B2A4A or equivalent rich navy) and Cream White (#FDFBF7 / #F5F0E8 or equivalent warm cream) color scheme."*
  - *"Use styled placeholder components (SVGs or styled boxes with descriptive labels/dimensions) for food and venue imagery — do not fetch external or stock photos."*
  - *"Highlight the chef's culinary story: a Jordanian native chef celebrating local organic farms, markets, seasonal ingredients, and intimate private chef dining."*
- **Lines 17-20 (R2. Friday-Only Concept & Dynamic Weekly Menu)**:
  - *"Prominently feature the unique dining schedule: open strictly one day a week (Fridays only)."*
  - *"Provide a structured weekly menu showcase (e.g., Starters, Mains, Dessert, Beverage pairings) displaying course descriptions, dietary indicators (organic, vegan, gluten-free, etc.), and the active Friday date range."*
  - *"Include a mechanism/data structure for updating or toggling weekly menu items easily."*
- **Lines 22-26 (R3. Friday Reservation & Booking Experience)**:
  - *"An interactive reservation modal/form allowing guests to request bookings exclusively for upcoming Fridays."*
  - *"The date selector must disable all non-Friday days."*
  - *"Inputs for party size / guest count, seating time slot, guest contact details, and dietary notes."*
  - *"Client-side validation with real-time feedback and a simulated confirmation receipt/screen upon submission."*
- **Lines 28-31 (R4. Production Readiness & Code Quality)**:
  - *"Built with React / Next.js and Tailwind CSS, structured with modular, reusable components."*
  - *"Responsive design tailored for mobile, tablet, and desktop viewports."*
  - *"The project must build cleanly with no build, typecheck, or lint errors."*
- **Lines 35-48 (Acceptance Criteria)**:
  - *"npm run build (or pnpm build / yarn build) completes with exit code 0 and zero lint/type errors."*
  - *"Application starts cleanly and serves pages without runtime console errors."*
  - *"Color scheme strictly emphasizes navy blue and cream white across backgrounds, typography, and borders."*
  - *"No remote or unstyled third-party photos are loaded; all image containers render as styled, nature-themed placeholders with dimensions/labels."*
  - *"Chef profile section specifically reflects Jordanian heritage, connection to nature, and local organic market sourcing."*
  - *"Weekly menu component renders distinct courses with dish names, organic ingredients, and dietary badges."*
  - *"Reservation date picker restricts selectable dates strictly to Fridays."*
  - *"Submitting the reservation form validates required inputs, updates state, and renders a booking confirmation state/summary."*

### 1.2 System & Tooling Observations
- Executed: `node -v && npm -v` in `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`  
  - Result: `bash: line 1: node: command not found` (Exit code 127).  
  - Search in filesystem: Ubuntu Linux system with VS Code installed at `/usr/share/code`. Node.js must be initialized / installed via NVM or standard package manager during the foundation milestone.
- Workspace root `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded` contains `.agents/teamwork/` metadata and `.git`.

---

## 2. Logic Chain

1. **Brand Identity & Atmosphere**:
   - The culinary narrative is tied to Jordan's ancient terroir: the fertile Jordan Valley (Ghor), Ajloun's thousand-year-old olive groves, Jerash mountain herbs, and Petra salt flats.
   - Strict palette adherence requires Navy Blue (`#0B192C` primary, `#1B2A4A` secondary slate navy) as deep grounded backgrounds and structural framing, and Cream White (`#FDFBF7` alabaster cream, `#F5F0E8` linen warm white) for typography and card backdrops, complemented by subtle olive/gold accents (`#C5A880` / `#D4AF37`) for dietary badges and subtle filigrees.
   - Because third-party / external photos are strictly forbidden, a bespoke `StyledPlaceholder` component must be designed that generates SVG-based nature silhouettes, organic botanical lines, and Levantine geometric motifs, alongside explicit dimension labels (e.g., `[ 1200 x 800 — Ajloun Heirloom Olive Grove ]`) and accessibility tags.

2. **Component Architecture & Next.js App Router Structure**:
   - To maximize modularity and maintainability, components should be decoupled into `common` (Navbar, Footer, StyledPlaceholder, Badge), `home` (HeroSection, ChefStorySection, FridayHighlightSection, WeeklyMenuShowcase, SourcingMapSection), and `reservation` (ReservationModal, FridayDatePicker, TimeSlotSelector, GuestCounter, ReservationForm, ConfirmationReceipt).
   - Interactive components (Modal, Form, DatePicker, Counter) must be marked with `'use client'`, while static presentational components remain server-compatible or lightweight client components.

3. **Data Models & Dynamic Menu Mechanism**:
   - The weekly menu data must be structured in a dedicated TypeScript file (`src/data/weeklyMenuData.ts`) following a strict schema (`WeeklyMenu`, `MenuCourse`, `MenuItem`, `DietaryPreference`).
   - The structure must support swapping weeks (e.g. `currentWeekIndex` or `selectedWeekMenu`), allowing immediate toggling of courses (Starters, Mains, Dessert, Artisanal Pairings) with active Friday date ranges.

4. **Friday Date Calculation & Booking Engine**:
   - A deterministic utility (`src/lib/dateUtils.ts`) must compute upcoming Fridays (`getNextFridays(count)`), validate that any selected date has `date.getDay() === 5`, and reject past dates or non-Fridays.
   - The reservation experience should feature real-time validation for required inputs (Name, Email, Phone, Friday Date, Time Slot, Party Size) and deliver a realistic luxury receipt with confirmation code `#JO-FRI-XXXX`, booking summary, and re-booking/print capabilities.

5. **Milestone Decomposition**:
   - Splitting into 4 linear milestones avoids monolithic blockages:
     - M1: Foundation, Design Tokens, Layout & Styled Placeholders.
     - M2: Storytelling, Hero & Dynamic Weekly Menu Showcase.
     - M3: Friday-Only Reservation Engine & Confirmation Experience.
     - M4: 4-Tier Verification, E2E Testing, Accessibility & Clean Build Audit.

6. **E2E Testing Strategy (Tiers 1-4)**:
   - A 4-tier matrix guarantees total coverage: Tier 1 (Unit & Date logic), Tier 2 (Component & Integration), Tier 3 (E2E User Journeys & Boundary edge cases), and Tier 4 (Visual, Accessibility & Production Build conformance).

---

## 3. Detailed Architecture Recommendations

### 3.1 Proposed Directory & File Layout

```
/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/
├── public/
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind directives + custom palette utility classes
│   │   ├── layout.tsx               # Root layout, Google serif & sans fonts, metadata
│   │   └── page.tsx                 # Main single-page application composition
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx            # Dietary badge (organic, vegan, gluten-free, etc.)
│   │   │   ├── Footer.tsx           # Luxury footer with hours, terroir map links, credits
│   │   │   ├── Navbar.tsx           # Sticky luxury navigation with Friday CTA
│   │   │   └── StyledPlaceholder.tsx# Nature-themed SVG image placeholder with labels/dimensions
│   │   ├── home/
│   │   │   ├── ChefStorySection.tsx # Jordanian chef heritage, Ajloun & Jordan Valley farm sourcing
│   │   │   ├── FridayHighlight.tsx  # Exclusive Friday concept breakdown (14 seats, 48h prep)
│   │   │   ├── HeroSection.tsx      # Atmospheric hero with next service Friday badge & reservation CTA
│   │   │   ├── MenuCourseCard.tsx   # Individual course display with ingredients & pairings
│   │   │   ├── SourcingMapSection.tsx# Interactive/styled breakdown of Jordan's organic farm partners
│   │   │   └── WeeklyMenuShowcase.tsx# Dynamic weekly rotating menu with course tabs & week selector
│   │   └── reservation/
│   │       ├── ConfirmationReceipt.tsx # Simulated luxury booking receipt with ref #JO-FRI-XXXX
│   │       ├── FridayDatePicker.tsx    # Calendar/selector strictly locking to upcoming Fridays
│   │       ├── GuestCounter.tsx        # Guest party size selector (1-8 guests)
│   │       ├── ReservationForm.tsx     # Validated reservation input fields
│   │       ├── ReservationModal.tsx    # Accessible modal container with backdrop blur & focus trap
│   │       └── TimeSlotSelector.tsx    # Seating slots (Early Afternoon, Sunset, Starlight)
│   ├── data/
│   │   ├── farmPartnersData.ts      # Jordanian organic farms (Ajloun, Jordan Valley, Jerash, Dead Sea)
│   │   └── weeklyMenuData.ts        # Rotating seasonal menu sets with Arabic culinary subtitles
│   ├── lib/
│   │   ├── dateUtils.ts             # Friday-only calculation, formatting, and validation logic
│   │   └── reservationService.ts    # Form validation & simulated receipt generation
│   └── types/
│       ├── menu.ts                  # TypeScript interfaces for weekly menu & courses
│       └── reservation.ts           # TypeScript interfaces for booking state & validation
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

---

### 3.2 Data Models & TypeScript Schemas

#### Menu Schema (`src/types/menu.ts`)
```typescript
export type DietaryPreference = 
  | 'organic' 
  | 'vegan' 
  | 'vegetarian' 
  | 'gluten-free' 
  | 'dairy-free' 
  | 'nut-free';

export interface PlaceholderConfig {
  label: string;
  dimensions: string; // e.g., "800 x 600"
  motif: 'olive_grove' | 'valley_harvest' | 'ancient_terroir' | 'plated_gourmet' | 'chef_portrait';
}

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string; // e.g., "فريكة بلدي بالزعتر البري"
  description: string;
  origin: string; // e.g., "Ajloun Ancient Groves" | "Ghor Organic Basin" | "Jerash Highlands"
  keyIngredients: string[];
  dietary: DietaryPreference[];
  beveragePairing?: {
    name: string;
    description: string;
  };
  placeholder: PlaceholderConfig;
}

export type CourseCategory = 'starters' | 'mains' | 'dessert' | 'pairings';

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
  seasonName: string; // e.g., "Autumn Terroir Series — 2026"
  activeFridayDate: string; // ISO format: "2026-10-23"
  activeFridayFormatted: string; // "Friday, October 23, 2026"
  themeSummary: string;
  chefTastingNotes: string;
  courses: MenuCourse[];
}
```

#### Reservation Schema (`src/types/reservation.ts`)
```typescript
export type SeatingSlotId = 'afternoon' | 'sunset' | 'starlight';

export interface SeatingSlot {
  id: SeatingSlotId;
  timeRange: string; // e.g. "1:30 PM – 4:00 PM"
  label: string; // "Early Afternoon Gathering"
  capacityStatus: 'available' | 'limited' | 'sold-out';
}

export interface ReservationRequest {
  fridayDate: string; // ISO "YYYY-MM-DD", must be a Friday
  slotId: SeatingSlotId;
  guestCount: number; // 1 to 8
  fullName: string;
  email: string;
  phone: string; // e.g. "+962 7 9XXX XXXX"
  dietaryPreferences: DietaryPreference[];
  specialNotes?: string;
  celebrationType?: 'none' | 'anniversary' | 'birthday' | 'private_gathering';
}

export interface ReservationConfirmation extends ReservationRequest {
  bookingReference: string; // e.g., "JO-FRI-20261023-8492"
  status: 'confirmed';
  pricingPerGuestJOD: number; // e.g. 75 JOD
  totalEstimateJOD: number;
  createdAt: string;
  venueAddress: string; // "Amman Outskirts / Jordan Valley Overlook"
  arrivalInstructions: string;
}

export interface FormErrors {
  fridayDate?: string;
  slotId?: string;
  guestCount?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}
```

---

### 3.3 Core Utility Logic: Friday Calculation & Validation

File: `src/lib/dateUtils.ts`

```typescript
/**
 * Returns array of upcoming Friday Dates starting from a given date.
 * If reference date is Friday past 12:00 PM, starts from next week's Friday.
 */
export function getUpcomingFridays(count: number = 8, fromDate: Date = new Date()): Date[] {
  const fridays: Date[] = [];
  const current = new Date(fromDate);
  
  // Reset time to start of day for clean comparison
  current.setHours(0, 0, 0, 0);

  // Day 5 is Friday
  let daysUntilFriday = (5 - current.getDay() + 7) % 7;
  
  // If today is Friday and already afternoon in reference time, push to next Friday
  if (daysUntilFriday === 0 && fromDate.getHours() >= 12) {
    daysUntilFriday = 7;
  }

  const nextFriday = new Date(current);
  nextFriday.setDate(current.getDate() + daysUntilFriday);

  for (let i = 0; i < count; i++) {
    const d = new Date(nextFriday);
    d.setDate(nextFriday.getDate() + (i * 7));
    fridays.push(d);
  }

  return fridays;
}

/**
 * Checks whether a given Date object falls strictly on a Friday (Day 5).
 */
export function isFriday(date: Date): boolean {
  return date.getDay() === 5;
}

/**
 * Validates if an ISO date string ("YYYY-MM-DD") is a valid upcoming Friday.
 */
export function validateFridayDate(isoDateString: string): { valid: boolean; error?: string } {
  if (!isoDateString) {
    return { valid: false, error: 'A dining date is required.' };
  }

  const [year, month, day] = isoDateString.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);

  if (isNaN(parsed.getTime())) {
    return { valid: false, error: 'Invalid date format.' };
  }

  if (parsed.getDay() !== 5) {
    return { 
      valid: false, 
      error: 'Dining is exclusively available on Fridays. Please select an upcoming Friday.' 
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed < today) {
    return { valid: false, error: 'Cannot book a past Friday. Please select a future date.' };
  }

  return { valid: true };
}

/**
 * Formats a Date object into luxury editorial text.
 * Example: "Friday, October 23, 2026"
 */
export function formatFridayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
```

---

### 3.4 Nature-Connected SVG Styled Placeholder Architecture

File: `src/components/common/StyledPlaceholder.tsx`

To honor Requirement R1 (strict ban on external/stock photos, pure styled placeholders with dimensions and labels):
- Accepts `aspectRatio` (e.g. `16/9`, `4/3`, `1/1`), `label`, `dimensions`, and `motif`.
- Visual motifs:
  - `olive_grove`: Stylized Ajloun olive branch vectors with delicate foliage.
  - `valley_harvest`: Geometric terraced slopes inspired by the Jordan Valley.
  - `plated_gourmet`: Concentric artisanal ceramic plate rings with herb garnishes.
  - `chef_portrait`: Elegant culinary silhouette with chef jacket and knife contour.
- Palette: Gradient background shifting from `#0B192C` to `#1B2A4A`, with Cream White (`#FDFBF7` / `#F5F0E8`) strokes at 30% opacity.
- Rendered badge: Centered translucent cream pill containing `[ ${dimensions} • ${label} ]` with SVG icon.
- Fully accessible with `role="img"` and `aria-label`.

---

## 4. Milestone Decomposition

| Milestone | Scope & Deliverables | File Ownership | Input / Output Contracts |
|---|---|---|---|
| **M1: Foundation, Design System & Styled Placeholders** | - Initialize Next.js 14/15 App Router with TypeScript & Tailwind CSS<br>- Configure Navy Blue (`#0B192C` / `#1B2A4A`) & Cream White (`#FDFBF7` / `#F5F0E8`) tokens<br>- Implement `StyledPlaceholder.tsx` with SVG motifs & dimension tags<br>- Implement `Navbar.tsx` (sticky, CTA trigger) and `Footer.tsx`<br>- Base responsive layout in `src/app/layout.tsx` | - `package.json`<br>- `tailwind.config.ts`<br>- `src/app/globals.css`<br>- `src/app/layout.tsx`<br>- `src/components/common/StyledPlaceholder.tsx`<br>- `src/components/common/Navbar.tsx`<br>- `src/components/common/Footer.tsx` | **Contract**: `npm run build` exits 0 with no lint/type errors. Shell page renders with styled placeholders and zero external network image requests. |
| **M2: Brand Heritage & Dynamic Weekly Menu Showcase** | - Chef Tareq profile section celebrating Jordanian terroir, Ajloun olive groves & Jordan Valley organic farms<br>- Hero section with next Friday service countdown & highlight<br>- Dynamic weekly menu data structure (`src/data/weeklyMenuData.ts`)<br>- `WeeklyMenuShowcase.tsx` featuring course tabs (Starters, Mains, Dessert, Pairings), dietary badges, and week selector | - `src/types/menu.ts`<br>- `src/data/weeklyMenuData.ts`<br>- `src/components/common/Badge.tsx`<br>- `src/components/home/HeroSection.tsx`<br>- `src/components/home/ChefStorySection.tsx`<br>- `src/components/home/WeeklyMenuShowcase.tsx`<br>- `src/components/home/MenuCourseCard.tsx`<br>- `src/components/home/SourcingMapSection.tsx` | **Contract**: Renders rich narrative and interactive menu showcase. Toggling weeks switches courses and active Friday date range smoothly. |
| **M3: Friday-Only Reservation Engine & Confirmation Experience** | - Friday calculation & validation engine in `src/lib/dateUtils.ts`<br>- Interactive `ReservationModal.tsx` with focus trapping & backdrop blur<br>- `FridayDatePicker.tsx` disabling all non-Friday days<br>- `TimeSlotSelector.tsx` (Afternoon, Sunset, Starlight)<br>- `GuestCounter.tsx` (1-8 guests)<br>- Real-time form validation with error messages<br>- `ConfirmationReceipt.tsx` simulated receipt screen with booking code `#JO-FRI-XXXX` | - `src/types/reservation.ts`<br>- `src/lib/dateUtils.ts`<br>- `src/lib/reservationService.ts`<br>- `src/components/reservation/ReservationModal.tsx`<br>- `src/components/reservation/FridayDatePicker.tsx`<br>- `src/components/reservation/TimeSlotSelector.tsx`<br>- `src/components/reservation/GuestCounter.tsx`<br>- `src/components/reservation/ReservationForm.tsx`<br>- `src/components/reservation/ConfirmationReceipt.tsx` | **Contract**: Clicking "Reserve Table" triggers modal. Date picker only permits upcoming Fridays. Submitting valid form transitions to confirmation receipt; invalid form highlights errors. |
| **M4: 4-Tier Verification, E2E Testing & Production Polish** | - Automated test suites across Tiers 1 to 4<br>- Unit tests for Friday calculations, leap years & validation<br>- Component tests for modal interaction and menu rendering<br>- E2E flow tests for complete booking journey & boundary rejection<br>- Responsive viewport verification (375px mobile, 768px tablet, 1440px desktop)<br>- Production build & lint verification | - `tests/unit/dateUtils.test.ts`<br>- `tests/unit/menuSchema.test.ts`<br>- `tests/integration/weeklyMenu.test.tsx`<br>- `tests/integration/reservationModal.test.tsx`<br>- `tests/e2e/bookingFlow.spec.ts`<br>- `tests/e2e/responsiveLayout.spec.ts` | **Contract**: `npm run build` exits 0 with zero errors. All test suites pass 100%. All acceptance criteria verified. |

---

## 5. Comprehensive E2E Testing Strategy (Tiers 1-4)

### Tier 1: Unit & Utility Tests (Deterministic Logic)
- **Date Utility Invariants**:
  - `getUpcomingFridays()` returns an array where every item has `date.getDay() === 5`.
  - When today is Wednesday 2026-10-21, `getUpcomingFridays(1)[0]` must be Friday 2026-10-23.
  - When today is Friday 2026-10-23 before cutoff (11:00 AM), `getUpcomingFridays(1)[0]` is 2026-10-23. After cutoff (1:00 PM), it is 2026-10-30.
  - `validateFridayDate('2026-10-24')` (Saturday) returns `{ valid: false, error: '...' }`.
  - `validateFridayDate('2020-01-03')` (Past Friday) returns `{ valid: false, error: '...' }`.
  - `validateFridayDate('2026-10-23')` (Valid future Friday) returns `{ valid: true }`.
- **Menu Data Integrity**:
  - Every weekly menu has at least 4 courses (Starters, Mains, Dessert, Pairings).
  - Every menu item has non-empty `name`, `arabicName`, `origin`, and valid `placeholder` metadata.
  - Dietary tags strictly match the `DietaryPreference` union type.

### Tier 2: Component & Integration Tests (UI & State)
- **Styled Placeholder Compliance**:
  - Verify DOM contains zero `<img>` tags pointing to remote HTTP/HTTPS resources.
  - Verify placeholder components render SVG graphics with visible dimension badges (e.g., `800 x 600`) and descriptive labels.
- **Weekly Menu Showcase**:
  - Test switching between course tabs ("Starters", "Mains", "Dessert", "Pairings").
  - Test switching active week in the week toggle: confirms that dish titles, ingredients, and the active Friday date display update dynamically without page reloads.
- **Reservation Modal Behavior**:
  - Modal opens on clicking "Reserve Friday Table" CTA in Navbar or Hero.
  - ESC key or clicking outside backdrop closes the modal.
  - Focus is trapped within the active modal dialog.

### Tier 3: End-to-End User Journeys (E2E)
- **Journey 1: Happy Path Friday Booking**:
  1. User navigates to homepage.
  2. Confirms "Next Service: Friday, [Date]" is displayed in Hero.
  3. Scrolls to Weekly Menu, inspects courses and dietary badges.
  4. Clicks "Reserve Friday Table".
  5. Selects upcoming Friday from calendar (asserting non-Fridays are disabled).
  6. Chooses "Sunset Service (6:00 PM – 8:30 PM)".
  7. Sets guest count to 4 using stepper.
  8. Fills Full Name ("Farah Haddad"), Email ("farah@example.com"), Phone ("+962 7 9555 1234"), notes "Organic / Gluten-Free preferred".
  9. Submits form.
  10. Verifies confirmation receipt appears with booking reference `#JO-FRI-...`, 4 guests, Friday date, and thank-you message.
- **Journey 2: Edge Cases & Validation Rejection**:
  - Submit with empty inputs: fields highlight red with inline error feedback.
  - Attempt manual entry of non-Friday date: validation error triggers.
  - Guest counter cannot be decremented below 1 or incremented above 8.
- **Journey 3: Cross-Device Responsiveness**:
  - Mobile (375px): Hamburger navigation opens full-screen menu; single-column course cards; modal adapts to bottom-sheet view.
  - Tablet (768px): 2-column layout for courses; optimized touch targets.
  - Desktop (1440px): Full multi-column luxury layout with sticky header.

### Tier 4: Brand Conformance & Production Verification
- **Visual Palette Audit**:
  - Automated CSS rule inspection: Primary background uses `#0B192C` (Navy), card fills use `#1B2A4A` or `#FDFBF7` (Cream), text uses high-contrast warm cream/navy.
  - Contrast check: Text contrast ratio satisfies WCAG AA (>= 4.5:1).
- **Zero-Error Build**:
  - `npm run build` exits with code 0.
  - `tsc --noEmit` exits with code 0 (zero TypeScript errors).
  - ESLint passes with zero warnings or errors.

---

## 6. Caveats

1. **Environment Toolchain Requirement**:
   - As observed via command line inspection, Node.js is not yet installed in the current shell PATH. Milestone 1 must begin with installing/configuring Node.js (v18+ or v20 LTS) and npm before running `create-next-app` or package installations.
2. **Pure Styled Placeholders**:
   - Per requirement R1, no external photography (Unsplash, Pexels, etc.) may be referenced. All placeholders will be SVG vector compositions crafted with Jordanian botanical and geometric terroir motifs.
3. **Simulated Persistence**:
   - The reservation experience simulates real-time confirmation receipts via client state and local storage. No external SQL/cloud database is required for the template, keeping the architecture self-contained and zero-config.

---

## 7. Conclusion

The architectural foundation, component hierarchy, TypeScript schemas, date calculation algorithms, 4-milestone plan, and 4-tier E2E testing framework are fully specified. The design guarantees:
1. Strict visual adherence to the upscale Jordanian Navy Blue (`#0B192C`) and Warm Cream (`#FDFBF7`) aesthetic with nature-themed SVG placeholders.
2. Uncompromising Friday-only dining restrictions enforced algorithmically in both UI and logic.
3. Clean, modular Next.js App Router code ready for step-by-step execution across Milestones 1 to 4 with zero build or type errors.

---

## 8. Verification Method

To independently verify this architectural recommendation:
1. **File Inspection**:
   - Verify that this handoff document exists at `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_survey_3/handoff.md`.
   - Inspect the component hierarchy in Section 3.1, data models in Section 3.2, and date calculation utility in Section 3.3.
2. **Requirement Coverage Matrix**:
   - Confirm R1 (Navy/Cream palette, SVG placeholders, Chef story) mapped to M1 & M2.
   - Confirm R2 (Friday-only schedule, weekly menu showcase, updatable schema) mapped to M2.
   - Confirm R3 (Friday-only datepicker, time slots, guest counter, validation, receipt) mapped to M3.
   - Confirm R4 (Next.js/Tailwind, responsive design, 0-error build) mapped across all milestones and Tier 4 verification.
3. **Invalidation Conditions**:
   - If any proposed component relies on external image URLs or remote assets.
   - If the date picker logic permits selecting a Monday, Tuesday, Wednesday, Thursday, Saturday, or Sunday.
   - If the milestone plan has circular dependencies or missing file ownership.
