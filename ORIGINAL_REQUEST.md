# Original User Request

## 2026-10-17T11:21:08Z

Build a responsive Next.js and Tailwind CSS website template for a prestigious Jordanian private chef and gourmet dining experience that operates exclusively one day per week on Fridays with an organic, locally-sourced weekly rotating menu. The visual identity features an organic nature-connected aesthetic with navy blue and cream white color palette and styled media placeholders.

Working directory: /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded
Integrity mode: development

## Requirements

### R1. Brand Identity & Visual Design
- Implement an upscale, nature-inspired visual identity featuring a strict Navy Blue (#0B192C / #1B2A4A or equivalent rich navy) and Cream White (#FDFBF7 / #F5F0E8 or equivalent warm cream) color scheme.
- Use styled placeholder components (SVGs or styled boxes with descriptive labels/dimensions) for food and venue imagery — do not fetch external or stock photos.
- Highlight the chef's culinary story: a Jordanian native chef celebrating local organic farms, markets, seasonal ingredients, and intimate private chef dining.

### R2. Friday-Only Concept & Dynamic Weekly Menu
- Prominently feature the unique dining schedule: open strictly one day a week (Fridays only).
- Provide a structured weekly menu showcase (e.g., Starters, Mains, Dessert, Beverage pairings) displaying course descriptions, dietary indicators (organic, vegan, gluten-free, etc.), and the active Friday date range.
- Include a mechanism/data structure for updating or toggling weekly menu items easily.

### R3. Friday Reservation & Booking Experience
- An interactive reservation modal/form allowing guests to request bookings exclusively for upcoming Fridays.
- The date selector must disable all non-Friday days.
- Inputs for party size / guest count, seating time slot, guest contact details, and dietary notes.
- Client-side validation with real-time feedback and a simulated confirmation receipt/screen upon submission.

### R4. Production Readiness & Code Quality
- Built with React / Next.js and Tailwind CSS, structured with modular, reusable components.
- Responsive design tailored for mobile, tablet, and desktop viewports.
- The project must build cleanly with no build, typecheck, or lint errors.

## Acceptance Criteria

### Technical Build & Verification
- [ ] `npm run build` (or `pnpm build` / `yarn build`) completes with exit code 0 and zero lint/type errors.
- [ ] Application starts cleanly and serves pages without runtime console errors.

### Visual & Concept Conformance
- [ ] Color scheme strictly emphasizes navy blue and cream white across backgrounds, typography, and borders.
- [ ] No remote or unstyled third-party photos are loaded; all image containers render as styled, nature-themed placeholders with dimensions/labels.
- [ ] Chef profile section specifically reflects Jordanian heritage, connection to nature, and local organic market sourcing.

### Feature Functionality
- [ ] Weekly menu component renders distinct courses with dish names, organic ingredients, and dietary badges.
- [ ] Reservation date picker restricts selectable dates strictly to Fridays.
- [ ] Submitting the reservation form validates required inputs, updates state, and renders a booking confirmation state/summary.
