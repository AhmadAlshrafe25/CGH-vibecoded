# Handoff Report: Tech Stack, Environment & Scaffolding Investigation

**Agent**: `survey_explorer_2` (Tech Stack & Scaffolding Explorer)  
**Date**: 2026-10-17  
**Working Directory**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_survey_2`  
**Target Project Directory**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`  
**Reference Document**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/ORIGINAL_REQUEST.md`  

---

## 1. Observation

### 1.1 Tooling & Binary Availability
- **Node.js**:
  - Running `node -v` yielded:
    ```
    bash: line 1: node: command not found (exit code 127)
    ```
  - An Electron binary wrapper exists at `/home/blackcrow/.config/Antigravity/bin/agy-node` which executes `ELECTRON_RUN_AS_NODE=1 exec "/home/blackcrow/Downloads/Antigravity/Antigravity-x64/antigravity" "$@"` and reports `v24.20.0`. However, this wrapper does NOT provide `npm` or `npx`.
- **Package Managers**:
  - `npm`, `pnpm`, `yarn`, `bun`, `deno` were checked across `/usr/bin`, `/usr/local/bin`, `/home/blackcrow/.local/bin`, and `~/.nvm`. None are installed or on PATH.
- **Root / Sudo Status**:
  - Running `sudo -n true` yielded:
    ```
    sudo: a password is required (exit code 1)
    ```
    System package installation via `sudo apt install nodejs` cannot run in non-interactive agent execution without user intervention.
- **System Utilities & Network**:
  - `git version 2.43.0` is installed and functional.
  - `tar (GNU tar) 1.35`, `curl 8.5.0`, `xz (XZ Utils) 5.4.5`, and `python3 3.12` are installed.
  - Outbound internet access was verified via `curl -I https://nodejs.org/dist/` returning `HTTP/2 200`.
- **Environment PATH**:
  - Current PATH:
    ```
    /home/blackcrow/.gemini/antigravity/bin:/home/blackcrow/.config/Antigravity/bin:/home/blackcrow/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
    ```
  - `/home/blackcrow/.gemini/antigravity/bin` is owned by `blackcrow:blackcrow` with permissions `drwxr-xr-x`, making it an ideal candidate for symlinks or user-space binaries.

### 1.2 Git & Workspace State
- Running `git status` in `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded` returned:
  ```
  On branch main
  No commits yet
  Untracked files:
    .agents/
    ORIGINAL_REQUEST.md
  ```
- No existing `package.json`, `node_modules`, `tsconfig.json`, or Next.js scaffolding files exist yet in `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`.

---

## 2. Logic Chain

### 2.1 Tooling Provisioning Strategy
1. **Observation**: `node` and `npm` are absent; `sudo -n` requires a password; `curl`, `tar`, and `xz` are present; network access to `nodejs.org` is confirmed; `/home/blackcrow/.local/` and `/home/blackcrow/.gemini/antigravity/bin` are user-writable.
2. **Inference**: Installing Node.js LTS via official prebuilt binaries in user space (`~/.local/` with symlinks in `~/.gemini/antigravity/bin` or adding `~/.local/bin` to PATH) requires zero sudo privileges, completes in seconds, provides official `node`, `npm`, and `npx`, and permanently unblocks scaffolding.
3. **Actionable Command**:
   ```bash
   mkdir -p /home/blackcrow/.local
   curl -fsSL https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-x64.tar.xz | tar -xJ --strip-components=1 -C /home/blackcrow/.local/
   # Symlink node, npm, npx into /home/blackcrow/.gemini/antigravity/bin (which is already first in PATH)
   ln -sf /home/blackcrow/.local/bin/node /home/blackcrow/.gemini/antigravity/bin/node
   ln -sf /home/blackcrow/.local/bin/npm /home/blackcrow/.gemini/antigravity/bin/npm
   ln -sf /home/blackcrow/.local/bin/npx /home/blackcrow/.gemini/antigravity/bin/npx
   ```

### 2.2 Next.js Architecture: App Router vs. Pages Router
1. **Observation**: R4 requires React / Next.js with Tailwind CSS, modular components, responsive design, and 0-error build. R1-R3 require an upscale landing page with structured weekly menus and an interactive Friday reservation modal.
2. **Inference**:
   - Next.js **App Router** (`src/app/` layout and page structure) is the modern standard for Next.js 14/15.
   - It cleanly separates server-rendered presentational sections (Hero, Heritage/Story, Menu structure, Nature Placeholders, Footer) from interactive client components (`"use client"` for Reservation Modal, Friday Date Picker, Party Size Selector, Dietary Filter).
   - App Router provides built-in Metadata generation (`export const metadata: Metadata`) for title, description, and OpenGraph, without extra head tags.
   - Standard path aliasing `@/*` mapping to `./src/*` enables clean, modular architecture.

### 2.3 Dependencies & Styling Strategy
1. **Observation**: R1 mandates an organic nature-connected aesthetic with strict Navy Blue (`#0B192C`, `#1B2A4A`) and Cream White (`#FDFBF7`, `#F5F0E8`) color palette; R1 specifically requires styled placeholder components (SVGs or styled boxes with descriptive labels/dimensions) without fetching external photos. R2-R3 require dietary tags, Friday date calculations, time slots, and reservation receipts.
2. **Inference**:
   - **Tailwind CSS (v3.4.x)** with PostCSS and Autoprefixer is the most stable and error-free styling pipeline.
   - Custom palette in `tailwind.config.ts`:
     - Navy: `#0B192C` (Primary background, deep cards, header), `#1B2A4A` (Card borders, secondary dark), `#243B66` (Accents/hover).
     - Cream: `#FDFBF7` (Primary light background, text on dark), `#FAF6EE` / `#F5F0E8` (Card background, badge fills), `#EADFC9` (Subtle dividers).
     - Accent: `#3E4D34` (Olive / organic farm green), `#C29B38` / `#D4AF37` (Artisan gold / reservation highlight).
   - **Icons**: `lucide-react` provides lightweight tree-shakable SVG icons (`Calendar`, `Clock`, `Users`, `CheckCircle`, `ChevronDown`, `Leaf`, `Utensils`, `Wine`, `Sparkles`, `ShieldCheck`, `AlertCircle`, `X`, `MapPin`).
   - **Date Utilities**: Date calculation for Fridays (`getNextFridays()`, `isFriday(date)`) should be implemented in a dedicated pure TypeScript utility (`src/utils/date-helpers.ts`) using native `Date` and `Intl.DateTimeFormat`. This prevents timezone bugs, eliminates heavy external date library dependencies, and guarantees zero peer-dependency collisions.
   - **Styled Placeholders**: `src/components/ui/StyledPlaceholder.tsx` rendering SVG illustrations with nature/olive motifs, container dimensions, and descriptive badges. Because no external images are loaded via `next/image`, zero remote domain configuration errors or runtime 404s can occur.

### 2.4 Build & Lint Zero-Error Strategy
1. **Observation**: Acceptance criteria require `npm run build` to complete with exit code 0 and zero lint/type errors.
2. **Inference**:
   - Common Next.js build failures stem from unescaped quotes (`&apos;`), hydration mismatches on client dates, unconfigured image hosts, and loose TypeScript types.
   - Build-proofing measures:
     1. Strict TypeScript interfaces in `src/types/index.ts` for all menu courses, dietary badges, reservation form inputs, and validation error records.
     2. Clean ESLint configuration (`next/core-web-vitals` and `next/typescript`).
     3. Escaping apostrophes in editorial text (e.g. `Chef&apos;s table`, `Jordan&apos;s organic harvest`).
     4. Deterministic date rendering: Date helpers produce deterministic ISO and formatted strings to avoid SSR/hydration discrepancies.
     5. Production build command: `next build` natively runs type checking (`tsc --noEmit`) and linting (`next lint`).

### 2.5 Testing & Verification Strategy
1. **Observation**: Testing needs to verify unit logic (date math, validation rules, menu data) and UI interactions (form modal, Friday restriction).
2. **Inference**:
   - **Vitest** + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`:
     - Fast, native ESM/TS support, identical API to Jest (`describe`, `it`, `expect`).
     - Tests run in milliseconds without transpilation hurdles.
     - Test coverage:
       - `date-helpers.test.ts`: Confirms `getNextFridays(count)` returns strictly Fridays; confirms validation rejects Saturdays, Thursdays, etc.
       - `menu-data.test.ts`: Confirms course structure, pricing, dietary indicators (organic, vegan, gluten-free), and active date ranges.
       - `ReservationModal.test.tsx`: Tests modal opening/closing, Friday date selection, validation error triggers on missing fields, and successful submission showing confirmation receipt.
   - **E2E / Smoke Verification**:
     - `scripts/verify-build.mjs`: Node script that runs `next build`, starts production server on a dedicated port, performs HTTP GET requests to check status 200, checks page title/content tokens, and cleanly shuts down.

---

## 3. Caveats

1. **System Node Not Installed**: As observed, `node` is currently absent from system PATH. The implementer must execute the user-space Node installation before running `npm` commands.
2. **No Passwordless Sudo**: The agent cannot use `sudo apt install`. The binary extraction into `~/.local` or `~/.gemini/antigravity/bin` is the verified, reliable user-space method.
3. **Offline Resilience**: Once dependencies are installed into `node_modules`, future builds and tests run completely offline and locally.

---

## 4. Conclusion & Recommendations

### 4.1 Recommended Scaffolding Blueprint

```
/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/
├── .eslintrc.json              # ESLint configuration (core-web-vitals)
├── next.config.mjs             # Next.js configuration (reactStrictMode: true)
├── package.json                # Project manifest, dependencies & scripts
├── postcss.config.mjs          # PostCSS with tailwindcss & autoprefixer
├── tailwind.config.ts          # Custom Navy/Cream palette & typography
├── tsconfig.json               # TypeScript strict configuration & paths
├── vitest.config.ts            # Vitest unit test runner config
├── scripts/
│   └── verify-build.mjs        # Production smoke test script
├── public/                     # Static assets / favicon
└── src/
    ├── app/
    │   ├── globals.css         # Tailwind base, components, utilities, Navy/Cream vars
    │   ├── layout.tsx          # Root layout with fonts, header, footer, SEO metadata
    │   └── page.tsx            # Main showcase page composing all sections
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx      # Navigation with reservation CTA
    │   │   └── Footer.tsx      # Heritage details, schedule reminder, contact
    │   ├── sections/
    │   │   ├── Hero.tsx        # Hero section highlighting Friday-only dining concept
    │   │   ├── ScheduleNotice.tsx # Highlight banner on exclusive Friday schedule
    │   │   ├── ChefStory.tsx   # Jordanian heritage & organic sourcing narrative
    │   │   ├── WeeklyMenu.tsx  # Interactive rotating menu (Starters, Mains, Dessert, Pairings)
    │   │   └── MediaGallery.tsx# Nature-inspired styled placeholders
    │   ├── reservation/
    │   │   ├── ReservationModal.tsx # Interactive reservation dialog
    │   │   ├── FridayDatePicker.tsx # Date picker restricting selection to Fridays only
    │   │   ├── PartySizeSelector.tsx# Guest count selector
    │   │   └── BookingReceipt.tsx   # Simulated confirmation receipt
    │   └── ui/
    │       ├── StyledPlaceholder.tsx # Reusable SVG placeholder with dimensions & label
    │       └── Badge.tsx            # Dietary badge (organic, vegan, gluten-free)
    ├── data/
    │   ├── menu-data.ts        # Weekly menu data schema and items
    │   └── chef-data.ts        # Chef biography, local farm partners (Ajloun, Jordan Valley)
    ├── types/
    │   └── index.ts            # TypeScript definitions (Menu, Reservation, Validation)
    ├── utils/
    │   ├── date-helpers.ts     # Friday calculation and validation logic
    │   └── cn.ts               # Classnames helper (clsx + twMerge)
    └── __tests__/
        ├── date-helpers.test.ts # Friday-only unit tests
        ├── menu-data.test.ts    # Menu data validation tests
        └── reservation.test.tsx # Form validation and confirmation tests
```

### 4.2 Recommended `package.json`

```json
{
  "name": "cgh-private-chef",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "verify": "node scripts/verify-build.mjs"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0",
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.2",
    "@testing-library/react": "^16.0.1",
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "^14.2.15",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vitest": "^2.1.3"
  }
}
```

---

## 5. Verification Method

### 5.1 Step 1: Provision Node & npm in User Space
Execute:
```bash
mkdir -p /home/blackcrow/.local
curl -fsSL https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-x64.tar.xz | tar -xJ --strip-components=1 -C /home/blackcrow/.local/
ln -sf /home/blackcrow/.local/bin/node /home/blackcrow/.gemini/antigravity/bin/node
ln -sf /home/blackcrow/.local/bin/npm /home/blackcrow/.gemini/antigravity/bin/npm
ln -sf /home/blackcrow/.local/bin/npx /home/blackcrow/.gemini/antigravity/bin/npx
node -v && npm -v
```
**Expected**: Prints `v20.18.0` and `10.8.2` (or current npm version) with exit code 0.

### 5.2 Step 2: Install Dependencies & Run Build
In `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`:
```bash
npm install
npm run build
```
**Expected**: Next.js production build creates `.next` directory with 0 errors and exit code 0.

### 5.3 Step 3: Run Unit & Component Tests
```bash
npm run test
```
**Expected**: Vitest runs test suites for `date-helpers`, `menu-data`, and `reservation`, passing 100% of test cases.

### 5.4 Invalidation Conditions
- If `node -v` fails to execute, PATH configuration or tarball extraction did not target an executable user directory.
- If `npm run build` fails with type errors, verify all component props and reservation state interfaces are strictly typed.
- If external images throw hydration or host errors, verify all imagery uses `StyledPlaceholder.tsx` components rather than remote URLs.
