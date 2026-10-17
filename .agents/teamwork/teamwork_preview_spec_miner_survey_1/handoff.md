# Comprehensive Specification & Requirements Inventory Report
**Agent**: survey_spec_miner_1 (Specification Investigator)  
**Date**: 2026-10-17T11:27:00Z  
**Source Specification**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/ORIGINAL_REQUEST.md`  
**Target Project**: Prestigious Jordanian Private Chef Friday-Only Dining Website  

---

## 1. Observation

Direct observations from the authoritative specification file (`ORIGINAL_REQUEST.md`):

1. **Project Scope & Identity** (`ORIGINAL_REQUEST.md:5-8`):
   > "Build a responsive Next.js and Tailwind CSS website template for a prestigious Jordanian private chef and gourmet dining experience that operates exclusively one day per week on Fridays with an organic, locally-sourced weekly rotating menu. The visual identity features an organic nature-connected aesthetic with navy blue and cream white color palette and styled media placeholders.
   > Working directory: /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded"

2. **R1: Brand Identity & Visual Design** (`ORIGINAL_REQUEST.md:12-15`):
   > "- Implement an upscale, nature-inspired visual identity featuring a strict Navy Blue (#0B192C / #1B2A4A or equivalent rich navy) and Cream White (#FDFBF7 / #F5F0E8 or equivalent warm cream) color scheme.
   > - Use styled placeholder components (SVGs or styled boxes with descriptive labels/dimensions) for food and venue imagery — do not fetch external or stock photos.
   > - Highlight the chef's culinary story: a Jordanian native chef celebrating local organic farms, markets, seasonal ingredients, and intimate private chef dining."

3. **R2: Friday-Only Concept & Dynamic Weekly Menu** (`ORIGINAL_REQUEST.md:17-20`):
   > "- Prominently feature the unique dining schedule: open strictly one day a week (Fridays only).
   > - Provide a structured weekly menu showcase (e.g., Starters, Mains, Dessert, Beverage pairings) displaying course descriptions, dietary indicators (organic, vegan, gluten-free, etc.), and the active Friday date range.
   > - Include a mechanism/data structure for updating or toggling weekly menu items easily."

4. **R3: Friday Reservation & Booking Experience** (`ORIGINAL_REQUEST.md:22-26`):
   > "- An interactive reservation modal/form allowing guests to request bookings exclusively for upcoming Fridays.
   > - The date selector must disable all non-Friday days.
   > - Inputs for party size / guest count, seating time slot, guest contact details, and dietary notes.
   > - Client-side validation with real-time feedback and a simulated confirmation receipt/screen upon submission."

5. **R4: Production Readiness & Code Quality** (`ORIGINAL_REQUEST.md:28-31`):
   > "- Built with React / Next.js and Tailwind CSS, structured with modular, reusable components.
   > - Responsive design tailored for mobile, tablet, and desktop viewports.
   > - The project must build cleanly with no build, typecheck, or lint errors."

6. **Acceptance Criteria** (`ORIGINAL_REQUEST.md:33-47`):
   > "- `npm run build` (or `pnpm build` / `yarn build`) completes with exit code 0 and zero lint/type errors.
   > - Application starts cleanly and serves pages without runtime console errors.
   > - Color scheme strictly emphasizes navy blue and cream white across backgrounds, typography, and borders.
   > - No remote or unstyled third-party photos are loaded; all image containers render as styled, nature-themed placeholders with dimensions/labels.
   > - Chef profile section specifically reflects Jordanian heritage, connection to nature, and local organic market sourcing.
   > - Weekly menu component renders distinct courses with dish names, organic ingredients, and dietary badges.
   > - Reservation date picker restricts selectable dates strictly to Fridays.
   > - Submitting the reservation form validates required inputs, updates state, and renders a booking confirmation state/summary."

7. **Environment State** (Tool execution observation):
   The root directory `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded` is initialized as a fresh git repository with no commits yet. Node binary was not found on standard default `$PATH`, requiring Explorer 2 to inspect and configure the node/pnpm environment for workers.

---

## 2. Logic Chain

1. **From R1 Color & Brand Constraints**:
   - The user mandates a strict two-tone luxury scheme: Navy Blue (`#0B192C` deep navy, `#1B2A4A` secondary navy) and Cream White (`#FDFBF7` soft alabaster, `#F5F0E8` warm linen cream).
   - High-contrast compliance: `#0B192C` on `#FDFBF7` provides a contrast ratio exceeding 14:1 (exceeding WCAG AAA standard of 7:1).
   - The tone must be upscale, intimate, and nature-inspired. Serif typography (e.g. Cormorant Garamond, Playfair Display, or elegant serif fallbacks) paired with crisp sans-serif (Inter / system-ui) creates the required Michelin/fine-dining atmosphere.

2. **From R1 Media Placeholder Constraint**:
   - Remote stock photos (Unsplash, Pexels, external CDNs) are strictly forbidden. Any failed remote HTTP request or broken image would violate the acceptance criteria.
   - Therefore, a dedicated `MediaPlaceholder` SVG/box component must be engineered with explicit aspect ratios, rendered pixel dimensions (e.g., `800 × 600`, `1200 × 800`), descriptive titles, and nature-themed SVG iconography (olive sprigs, chef cloche, terroir contour lines).

3. **From R1 Chef Story & Jordanian Terroirs**:
   - To make the culinary narrative authentic to Jordan, the chef story must highlight native heritage and specific renowned organic agricultural regions:
     - *Ajloun Highlands*: Centuries-old olive groves, wild sumac, mountain herbs.
     - *Jordan Valley (Al-Ghor)*: Heirloom tomatoes, citrus, micro-greens, winter harvest.
     - *Jerash Terraces*: Heritage stone fruits, figs, pomegranates, organic goat labneh.
     - *Dead Sea & Desert*: Artisanal sea salts, Medjool date palms.
     - *Amman Organic Markets*: Direct farm-to-table morning harvest.

4. **From R2 Friday-Only Concept & Menu Data Structure**:
   - Friday is culturally and gastronimically significant in Jordan (the day of family gatherings and sacred rest). The platform elevates this into a weekly culinary ritual.
   - The weekly menu must showcase 4 distinct course categories: Starters, Mains, Desserts, and Beverage Pairings.
   - An extensible, strongly-typed data structure (`types/menu.ts` and `data/menuData.ts`) must decouple menu content from UI rendering, allowing easy toggling of active Friday dates, week editions, and dietary flags (Organic, Vegan, Gluten-Free).

5. **From R3 Friday Reservation Modal & Validation**:
   - Booking is strictly limited to Fridays. A standard HTML5 `<input type="date">` allows any weekday; therefore, a dedicated Friday calendar picker must be constructed that computes upcoming Fridays, enables only day-of-week = 5, and disables past dates.
   - Required inputs: Seating slot (Lunch 1:30 PM vs Dinner 7:30 PM), Party size (1-8 guests), Full Name, Email, Phone Number, Dietary Notes.
   - Client-side validation must check all fields before state submission, transitioning to an upscale digital booking voucher / receipt.

6. **From R4 Production Readiness**:
   - Modular component architecture in Next.js App Router with TypeScript and Tailwind CSS.
   - Complete type safety prevents runtime errors and guarantees zero typecheck/build errors on `npm run build`.

---

## 3. Caveats

1. **Backend Integration**: The specification specifies a website template with client-side state validation and simulated confirmation receipt. No persistent database or live email/SMS gateway is required; booking state is managed in React state or session storage with realistic feedback.
2. **Environment Toolchain**: The environment explorer (Explorer 2) must determine the exact Node.js/package manager executable path in the environment so build commands run smoothly.
3. **Calendar Window**: The booking date picker should offer a sensible future horizon (e.g. next 4 to 8 upcoming Fridays) to reflect realistic intimate dining scarcity.
4. **Photography Substitutes**: While styled placeholders are required, they must look aesthetically intentional, high-end, and harmonious with the navy/cream palette, not like raw unfinished wireframes.

---

## 4. Conclusion

The requirements are unambiguous, highly focused, and architecturally coherent. The project requires:
1. A Tailwind configuration locking the color palette to the specified Navy Blue and Cream White tones.
2. A resilient `MediaPlaceholder` component replacing all external photography with nature-inspired SVG vector art, labels, and dimensions.
3. An authentic Jordanian culinary narrative grounded in Ajloun, Jerash, Jordan Valley, and Amman organic markets.
4. A multi-course weekly menu structure with dietary badges and weekly edition switcher.
5. An interactive Friday reservation booking engine with strict Friday-only date enforcement and confirmation voucher output.

All specifications have been mapped into functional requirements, data schemas, edge cases, and verification criteria.

---

## 5. Verification Method

To independently verify conformance to the specification:

1. **Build & Typecheck Command**:
   ```bash
   npm run build
   # Must exit with code 0, 0 TypeScript errors, 0 ESLint errors
   ```

2. **Zero External Image Audit**:
   ```bash
   grep -rn "http://" src/ app/ | grep -v "schema.org" || true
   grep -rn "https://" src/ app/ | grep -iE "(unsplash|pexels|cloudinary|imgur|\.jpg|\.png)" || true
   # Must return 0 external photo URLs
   ```

3. **Color Palette Conformance Audit**:
   Verify Tailwind CSS theme configuration and stylesheet contains only the authorized navy and cream colors:
   - Navy: `#0B192C`, `#1B2A4A`
   - Cream: `#FDFBF7`, `#F5F0E8`
   - Verified via: `grep -E "#0B192C|#1B2A4A|#FDFBF7|#F5F0E8" tailwind.config.*`

4. **Friday Datepicker Constraint Test**:
   - Instantiate the date picker component.
   - Verify that any non-Friday date (e.g. Monday-Thursday, Saturday-Sunday) is disabled / non-selectable.
   - Verify that selectable dates return `date.getDay() === 5`.

5. **Reservation Form Validation & Receipt Verification**:
   - Attempt submission with empty fields -> verify error messages rendered.
   - Attempt submission with valid Friday date, party size, name, email, phone -> verify transition to confirmation receipt displaying matching booking data and unique reservation code.

---

## 6. Comprehensive Requirement & Feature Inventory

### Feature Area 1: Brand Identity & Visual Design
- **Theme Palette**:
  - `brand-navy-dark`: `#0B192C` (Primary background for dark sections, primary typography on light)
  - `brand-navy-card`: `#1B2A4A` (Surface color for dark cards, headers, interactive buttons)
  - `brand-cream-light`: `#FDFBF7` (Primary background for light sections, typography on dark)
  - `brand-cream-warm`: `#F5F0E8` (Secondary background for subtle section contrast, placeholder canvas)
  - `brand-accent-gold`: `#C5A880` (Refined metallic gold accent for subtle borders, course numbers, badges)
  - `brand-border-dark`: `rgba(27, 42, 74, 0.15)`
  - `brand-border-light`: `rgba(253, 251, 247, 0.2)`
- **Typography**:
  - Serif: High-luxury editorial serif for brand logo, section headings, chef quotes, and dish names (`Cormorant Garamond` / `Playfair Display` / serif fallback).
  - Sans-Serif: Refined geometric/humanist sans for body copy, labels, dietary tags, buttons, and form controls (`Inter` / `Plus Jakarta Sans` / sans-serif fallback).
- **Tone & Atmosphere**:
  - Exclusive, artisanal, tranquil, nature-rooted.
  - Subtle Levantine motifs (geometric lattice, olive branches, Arabic calligraphic subtitles).
  - Atmospheric section dividers with fine hairlines and decorative diamonds.

### Feature Area 2: Media Placeholders System
- **Component Interface**:
  ```typescript
  interface MediaPlaceholderProps {
    title: string;           // e.g. "Wood-Fired Baladi Lamb Shank"
    category: string;        // e.g. "Signature Course" | "Terroir & Farm" | "The Salon"
    dimensions: string;      // e.g. "800 × 600", "1200 × 800", "500 × 500"
    aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9' | '3:4';
    variant?: 'navy' | 'cream';
    iconType?: 'botanical' | 'culinary' | 'farm' | 'terroir' | 'salon' | 'pairing';
    className?: string;
  }
  ```
- **SVG Motifs**:
  - Handcrafted SVG vectors depicting olive trees, wheat stalks, culinary cloches, terroir topographical lines, chef knives, and ceramic vessels.
  - Dimension badge rendered with clean monospace styling (e.g. `[ 800 × 600 px ]`).
  - No remote network requests; zero broken image risk; 100% responsive vector scaling.

### Feature Area 3: Chef's Culinary Story & Heritage
- **Chef Persona**: Chef Tariq Al-Amad (Jordanian native master chef).
- **Narrative Pillars**:
  1. *The Levantine Roots*: Deep respect for Jordanian hospitality (*Karam*) and ancestral recipes passed down through generations.
  2. *Regional Terroirs*:
     - **Ajloun**: Centuries-old rainfed Roman olive groves, wild sumac, foraged mountain mushrooms.
     - **Jordan Valley (Ghor)**: Subtropical winter bounty, heirloom sun-dried tomatoes, sweet citrus, micro-basil.
     - **Jerash**: Sun-drenched fig terraces, wild za'atar, pomegranate orchards, artisanal baladi goat dairy.
     - **Dead Sea Basin**: Hand-harvested pristine mineral salt crystals.
     - **Amman Farmers Market**: Hyper-local partnership with smallholder organic growers.
  3. *The Friday Ritual*: Gastronomic intimacy limited to one single banquet service per week, ensuring zero food waste, direct farm coordination on Thursday, and freshly harvested dishes on Friday.

### Feature Area 4: Friday-Only Dynamic Weekly Menu
- **Menu Data Structure (`types/menu.ts`)**:
  ```typescript
  export type CourseCategory = 'starters' | 'mains' | 'dessert' | 'beverage';
  export type DietaryBadge = 'Organic' | 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free';

  export interface MenuItem {
    id: string;
    title: string;
    arabicTitle?: string;
    category: CourseCategory;
    description: string;
    originSourcing: string; // e.g. "Ajloun Cold-Pressed Olive Oil & Jerash Pomegranate"
    dietaryBadges: DietaryBadge[];
    placeholderImage: {
      title: string;
      dimensions: string;
      aspectRatio: '16:9' | '4:3' | '1:1';
      iconType: 'culinary' | 'botanical' | 'pairing';
    };
  }

  export interface WeeklyMenuEdition {
    id: string;
    weekNumber: number;
    fridayDate: string; // e.g. "2026-10-24"
    formattedDate: string; // e.g. "Friday, October 24, 2026"
    themeTitle: string; // e.g. "Northern Highlands & Autumn Olive Harvest"
    isActive: boolean;
    courses: {
      starters: MenuItem[];
      mains: MenuItem[];
      dessert: MenuItem[];
      beverage: MenuItem[];
    };
  }
  ```
- **Interactive Menu Features**:
  - Week edition selector ("Current Harvest Edition" vs "Upcoming Friday Preview").
  - Course filter tabs: "Full 4-Course Tasting", "Starters", "Mains", "Dessert", "Beverage Pairings".
  - Dietary filter buttons: "Show All", "Vegetarian / Vegan Only", "Gluten-Free Only".
  - Clear dietary badges rendered beside each dish.

### Feature Area 5: Friday Reservation & Booking Experience
- **Reservation Modal & Form Inputs**:
  1. `seatingDate`: Strictly validated Friday date picker.
  2. `seatingSlot`: Choice of "Afternoon Terrace Seating (1:30 PM – 4:30 PM)" or "Evening Starlight Salon (7:30 PM – 10:30 PM)".
  3. `partySize`: Number of guests (1 to 8 guests; 8+ triggers private salon buyout guidance).
  4. `guestName`: Full name input.
  5. `guestEmail`: Email address input.
  6. `guestPhone`: Phone number input (with Jordan `+962` indicator).
  7. `dietaryNotes`: Checkboxes (Vegetarian, Vegan, Gluten-Free, Nut Allergies, Shellfish Allergy) + free-text special requests.
  8. `occasion`: Optional dropdown (Anniversary, Birthday, Business Dining, Gastronomic Exploration).
- **Validation Rules**:
  - Date must be a future Friday (`day === 5` and `timestamp >= today`). Non-Fridays cannot be selected.
  - All contact inputs (Name, Email, Phone) must be valid and non-empty.
  - Seating slot must be selected.
  - Party size must be an integer between 1 and 8.
- **Simulated Confirmation Receipt (Voucher)**:
  - Generates unique reference code (e.g. `JOR-FRIDAY-84920`).
  - Displays summary of guest name, party size, date, seating time slot, and special dietary requests.
  - Highlights private salon address guidelines in Amman (Dabouq / Jabal Amman).
  - Offers "Print / Save Voucher" and "Add to Calendar" buttons.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Brand Identity | Strict Navy & Cream Palette | Visual theme enforcing Navy Blue (#0B192C / #1B2A4A) and Cream White (#FDFBF7 / #F5F0E8) across all UI elements | CSS variables, Tailwind classes | Consistent high-contrast luxury UI | Rejects unstyled colors or off-palette accents | ORIGINAL_REQUEST.md:12-13 |
| 2 | Typography | Fine-Dining Serif & Modern Sans Hierarchy | High-end typography system pairing classical serif titles with crisp sans body copy | Text strings, typography tokens | Stylized editorial layout with letter-spacing | System fallback fonts preserve layout integrity | ORIGINAL_REQUEST.md:5,13 |
| 3 | Media System | Styled SVG Placeholders | Nature-themed vector graphics with descriptive labels and explicit dimensions; 0 remote photo dependencies | Title, category, dimensions, aspect ratio, theme | Responsive SVG vector container with metadata overlay | Fallback to default styled vector if props missing | ORIGINAL_REQUEST.md:14,41 |
| 4 | Chef Profile | Jordanian Heritage & Storytelling | Interactive profile celebrating native chef, Levantine culinary philosophy, and intimate hospitality | Chef biography data, ethos quotes | Rich narrative section with culinary badges | Graceful responsive folding on mobile | ORIGINAL_REQUEST.md:15,42 |
| 5 | Terroir Grid | Regional Farm Sourcing Map | Showcase of Jordan Valley, Ajloun, Jerash, Dead Sea, and Amman organic markets | Farm regions, ingredient origins | Interactive cards detailing local farm partnerships | N/A (Static verified content) | ORIGINAL_REQUEST.md:15,42 |
| 6 | Friday Cadence | Prominent Friday-Only Scheduling | Hero banner and visual highlights indicating exclusive Friday operating schedule | Active Friday date | Prominent schedule badges and countdown ticker | Displays next available Friday if current passes | ORIGINAL_REQUEST.md:17-18 |
| 7 | Weekly Menu | 4-Course Structured Showcase | Detailed breakdown of Starters, Mains, Dessert, and Beverage Pairings with descriptions | WeeklyMenuEdition data object | Structured menu grid with course groupings | Empty course state handler | ORIGINAL_REQUEST.md:18-19,45 |
| 8 | Dietary Badges | Course Dietary Indicators | Visual tags for Organic, Vegan, Vegetarian, Gluten-Free on all menu items | Dietary badge array per item | Styled pill badges in navy & cream | Conceals badge container if array empty | ORIGINAL_REQUEST.md:19,45 |
| 9 | Menu Switcher | Updatable/Multi-Week Menu Toggle | Mechanism to switch between current Friday harvest and upcoming Friday previews | Week edition ID toggle | Re-renders menu dishes for selected week edition | Retains fallback active week if invalid ID | ORIGINAL_REQUEST.md:20 |
| 10 | Dietary Filter | Menu Course & Dietary Filtering | Client-side filter to view only Vegan, Gluten-Free, or specific courses | Filter selection state | Filtered subset of menu items | "No dishes match this dietary filter" empty state | ORIGINAL_REQUEST.md:19 |
| 11 | Reservation | Interactive Booking Modal / Drawer | Dedicated modal overlay or interactive section triggered from navigation and hero CTAs | Open/close trigger state | Modal with backdrop blur and form fields | Esc key and backdrop click close modal | ORIGINAL_REQUEST.md:22-23 |
| 12 | Date Picker | Strict Friday-Only Date Selector | Interactive calendar / picker disabling all non-Friday days and past dates | Calendar selection, Date object | Selectable Friday dates only; non-Fridays disabled | Disables selection; prevents non-Friday submit | ORIGINAL_REQUEST.md:23-24,46 |
| 13 | Seating Selector | Friday Time Slot Chooser | Radio buttons choosing between Afternoon Seating (1:30 PM) and Evening Seating (7:30 PM) | Slot choice | Selected seating slot with availability badge | Form validation blocks submit if unselected | ORIGINAL_REQUEST.md:25 |
| 14 | Party Stepper | Guest Count Input (1-8) | Counter / selector for party size from 1 to 8 guests with private buyout notice for >8 | Guest number | Updated guest count in state | Restricts range 1-8; warns on invalid input | ORIGINAL_REQUEST.md:25 |
| 15 | Form Validation | Real-Time Client Validation | Instant visual validation on blur and submit for name, email, phone, date, and slots | Form field values | Inline feedback messages and border highlight | Disables submit button or shows inline error | ORIGINAL_REQUEST.md:26,47 |
| 16 | Receipt Voucher | Simulated Confirmation Receipt | Transition to formal digital booking confirmation voucher upon submission | Valid reservation form data | Printable/viewable reservation voucher with ref ID | Resets form upon closing confirmation | ORIGINAL_REQUEST.md:26,47 |
| 17 | Responsive UI | Multi-Device Responsive Layout | Tailored responsive design for mobile (320px+), tablet (768px+), and desktop (1024px+) | Viewport width | Responsive flex/grid layouts with mobile navigation | Graceful wrapping without horizontal overflow | ORIGINAL_REQUEST.md:30 |
| 18 | Production Build | Clean Build & Typecheck | Zero lint errors, zero TypeScript errors on Next.js App Router | Source code repository | Clean exit code 0 on `npm run build` | Build fails with clear error messages | ORIGINAL_REQUEST.md:31,36 |

---

## Edge Cases

| # | Feature | Input | Observed / Required Behavior |
|---|---------|-------|------------------------------|
| 1 | Friday Date Picker | User attempts to click a Saturday, Sunday, or weekday | Date is rendered disabled (`pointer-events-none opacity-40 cursor-not-allowed`) and cannot be focused or selected. |
| 2 | Friday Date Picker | Past Friday dates in calendar | Rendered as past/disabled; user can only pick current or upcoming Fridays. |
| 3 | Reservation Form | Submit button clicked with all fields blank | Form validation triggers immediately; inline red/warning text highlights required fields (Name, Email, Phone, Seating Date, Seating Slot); focus shifts to first invalid input. |
| 4 | Reservation Form | Invalid email format (e.g. `guest@`, `guest.com`, `guest@domain`) | Regex validation flags email field: "Please provide a valid email address (e.g. name@domain.com)". |
| 5 | Reservation Form | Invalid phone number format (e.g. letters or too few digits) | Phone validation flags input: "Please provide a valid contact number (min 7 digits)". |
| 6 | Reservation Form | Party size set to 0 or negative numbers | Counter clamps minimum value to 1; decrement button is disabled when count is 1. |
| 7 | Reservation Form | Party size set to >8 guests | Input limits selector to 8; banner indicates "For intimate gatherings beyond 8 guests, please request a Private Salon Buyout". |
| 8 | Reservation Modal | User presses 'Escape' key or clicks backdrop | Modal safely closes, preserving form draft state if user reopens, without submitting. |
| 9 | Confirmation Voucher | User submits valid booking form | Form displays brief loading animation ("Securing your Friday table..."), then transitions cleanly to the confirmation voucher with a unique reference number. |
| 10 | Menu Dietary Filter | User selects "Vegan" filter when a course has no vegan items | Displays an elegant placeholder: "Our chef customizes this course for vegan guests upon request at reservation." |
| 11 | Weekly Menu Switcher | User toggles from "Current Friday" to "Next Friday" | Smoothly transitions course cards, updates active date badge, and maintains current course tab without layout shift. |
| 12 | Media Placeholder | Ultra-small mobile viewport (320px) | SVG placeholder maintains responsive aspect ratio, scales text typography cleanly, and never causes horizontal scrolling. |
| 13 | Network Offline / No External CDNs | Browsing without internet connection | All SVG placeholders, styling, and fonts render locally without broken image icons or CDN timeouts. |
| 14 | Color Palette Verification | Component inspection across all views | Every background, card, button, border, and typography element strictly conforms to Navy (`#0B192C` / `#1B2A4A`) and Cream (`#FDFBF7` / `#F5F0E8`). |

---

## 7. Recommended Component & Data Layout

```
src/ (or app/)
├── app/
│   ├── layout.tsx             # Root layout with navy/cream theme, metadata, serif font imports
│   ├── page.tsx               # Primary landing page assembling all sections
│   ├── globals.css            # Tailwind directives, custom font variables, color tokens
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Brand logo, Friday badge, navigation links, Reserve CTA
│   │   └── Footer.tsx         # Sourcing credits, private dining guidelines, copyright
│   ├── hero/
│   │   └── HeroSection.tsx    # Grand visual intro, Friday-only declaration, quick CTAs
│   ├── story/
│   │   ├── ChefStory.tsx      # Native Jordanian chef biography, culinary philosophy
│   │   └── TerroirSourcing.tsx# Regional organic farm showcase (Ajloun, Jerash, Ghor)
│   ├── menu/
│   │   ├── WeeklyMenu.tsx     # Menu showcase, week edition selector, course filter tabs
│   │   └── DishCard.tsx       # Individual course card with dietary badges & sourcing origin
│   ├── reservation/
│   │   ├── ReservationModal.tsx     # Modal container & overlay
│   │   ├── ReservationForm.tsx      # Form controls, Friday date picker, party size, validation
│   │   ├── FridayDatePicker.tsx     # Strict Friday-only date selector
│   │   └── ConfirmationReceipt.tsx  # Digital booking voucher receipt screen
│   └── ui/
│       ├── MediaPlaceholder.tsx     # Reusable SVG vector placeholder with labels & dimensions
│       └── DietaryBadge.tsx         # Organic, Vegan, Gluten-free styled pills
├── data/
│   ├── menuData.ts            # Strongly-typed multi-week menu editions
│   └── farmSourcingData.ts    # Jordanian farm partners & terroir details
├── types/
│   ├── menu.ts                # TypeScript interfaces for courses, items, dietary badges
│   └── reservation.ts         # TypeScript interfaces for booking state & validation
└── utils/
    ├── dateUtils.ts           # Helper functions for upcoming Friday calculation & validation
    └── validation.ts          # Validation logic for booking inputs
```
