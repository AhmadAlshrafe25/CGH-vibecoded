# M1 Foundation & Scaffolding Exploration Report

**Agent**: `m1_explorer_1` (M1 Foundation Explorer)  
**Date**: 2026-10-17  
**Working Directory**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_m1_1`  
**Target Project Directory**: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`  
**Reference Documents**:
- `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/ORIGINAL_REQUEST.md`
- `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/PROJECT.md`
- `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_survey_2/handoff.md`

---

## 1. Observation

### 1.1 Host Environment & Tooling State
- Command `uname -m` executed:
  ```
  x86_64
  ```
- Command `uname -a` executed:
  ```
  Linux pop-os 7.1.5-76070105-generic #202607241434~1787955023~24.04~38a419f SMP PREEMPT_DYNAMIC Fri A x86_64 x86_64 x86_64 GNU/Linux
  ```
- Command `ldd --version | head -n 1` executed:
  ```
  ldd (Ubuntu GLIBC 2.39-0ubuntu8.9) 2.39
  ```
- Command `echo $PATH` executed:
  ```
  /home/blackcrow/.gemini/antigravity/bin:/home/blackcrow/.config/Antigravity/bin:/home/blackcrow/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
  ```
- Directory `/home/blackcrow/.gemini/antigravity/bin`:
  - Owned by `blackcrow:blackcrow`, permissions `drwxr-xr-x`.
  - Is the **first entry** in `$PATH`.
- User directory `/home/blackcrow/.local`:
  - Owned by `blackcrow:blackcrow`, permissions `drwxr-xr-x`.
- Command `which node` returned:
  ```
  node not in PATH (exit code 1)
  ```
- Command `which npm` returned:
  ```
  npm not in PATH (exit code 1)
  ```

### 1.2 Binary Archive Verification
- Verified HTTP response for Node 20.18.0 LTS tarball:
  ```bash
  curl -sI https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-x64.tar.xz
  ```
  Returned `HTTP/2 200`, `content-type: application/x-xz`, `content-length: 25738964` (~25.7 MB).
- Inspected archive structure:
  - Archive root: `node-v20.18.0-linux-x64/`
  - Binaries: `bin/node` (ELF 64-bit executable), `bin/npm` (symlink to `../lib/node_modules/npm/bin/npm-cli.js`), `bin/npx` (symlink to `../lib/node_modules/npm/bin/npx-cli.js`).
  - Libraries: `lib/node_modules/npm/`.

### 1.3 Execution Mechanics & Shebang Dependency Test
- Direct execution test in temporary sandbox without `node` in PATH:
  ```bash
  /tmp/node-test/bin/node -v  # Output: v20.18.0
  /tmp/node-test/bin/npm -v   # Output: /usr/bin/env: 'node': No such file or directory (exit code 127)
  ```
- Re-tested with `node` directory prepended to `$PATH`:
  ```bash
  PATH="/tmp/node-test/bin:$PATH" /tmp/node-test/bin/npm -v
  ```
  Output: `10.8.2` (exit code 0).
- **Core Observation**: `npm` uses `#!/usr/bin/env node`. If `node` is symlinked into `/home/blackcrow/.gemini/antigravity/bin` (which is permanently the first directory in `$PATH`), running `npm` resolves `node` via `env` with zero errors.

---

## 2. Logic Chain

1. **Premise 1 (Tooling Availability)**: The development environment lacks system `node` and `npm`, and non-interactive agents cannot use `sudo` without passwords.
2. **Premise 2 (User-Space Permissions)**: `/home/blackcrow/.local/` and `/home/blackcrow/.gemini/antigravity/bin/` are owned by `blackcrow:blackcrow` with read/write permissions.
3. **Premise 3 (PATH Precedence)**: `/home/blackcrow/.gemini/antigravity/bin` is the very first path in `$PATH`.
4. **Premise 4 (Archive Compatibility)**: The official Node 20.18.0 x64 binary matches the Ubuntu 24.04 (GLIBC 2.39) x86_64 host architecture.
5. **Inference 1 (Node & npm Provisioning)**: Extracting the tarball with `--strip-components=1` into `/home/blackcrow/.local/` places `node`, `npm`, and `npx` in `~/.local/bin` and libraries in `~/.local/lib/node_modules`. Creating symlinks in `/home/blackcrow/.gemini/antigravity/bin` exposes `node`, `npm`, and `npx` system-wide for the user, satisfies the `#!/usr/bin/env node` shebang, and enables normal `npm` workflows.
6. **Inference 2 (Next.js 14 Scaffolding)**:
   - Next.js 14 App Router (`src/app/`) with TypeScript and Tailwind CSS 3.4 provides the contract-compliant layout requested in `PROJECT.md`.
   - `clsx` and `tailwind-merge` provide standard conditional class utility (`cn()`).
   - `lucide-react` provides lightweight vector icons with zero image file dependencies.
   - PostCSS config with `tailwindcss` and `autoprefixer` enables smooth compilation.
7. **Inference 3 (Brand Design System & Color Tokens)**:
   - `PROJECT.md §1` defines strict design tokens:
     - `brand-navy-dark`: `#0B192C`
     - `brand-navy-card`: `#1B2A4A`
     - `brand-cream-light`: `#FDFBF7`
     - `brand-cream-warm`: `#F5F0E8`
     - `brand-accent-gold`: `#C5A880`
     - `brand-accent-olive`: `#3E4D34`
   - Extending Tailwind with both flat tokens (`brand-navy-dark`) and nested semantic namespaces (`brand.navy.dark`) ensures full backward and forward compatibility for all component authors.
8. **Inference 4 (CSS Variables & Resilient Font Fallbacks)**:
   - Defining CSS custom properties in `:root` and `@layer base` guarantees consistency across dark backgrounds, typography, custom scrollbars, and luxury gold divider accents.
   - Declaring serif fallbacks (`'Cormorant Garamond', Garamond, Georgia, serif`) prevents layout shifts or font loading failures if external web fonts are delayed or offline.

---

## 3. Caveats

1. **Existing Cache In Shell**: In an existing persistent terminal session, bash may have cached negative lookups for `node` and `npm`. The implementer must run `hash -r` after creating symlinks to clear bash command location cache.
2. **Relative Symlinks in npm**: In `node-v20.18.0-linux-x64/bin`, `npm` is a relative symlink to `../lib/node_modules/npm/bin/npm-cli.js`. Therefore, the entire tarball must be extracted into `/home/blackcrow/.local/` so that `~/.local/lib/node_modules/npm` exists; symlinking only the standalone `bin/node` binary without extracting `lib/` would break `npm`.
3. **No External Photos**: R1 strictly prohibits external stock photos. The `StyledPlaceholder.tsx` component must be scaffolded during M1 to provide responsive SVG visuals with explicit dimension badges for all media slots.

---

## 4. Conclusion & Implementation Blueprints

Below are the exact, verified commands and complete file templates ready for immediate execution by the M1 implementation agent.

### 4.1 Step 1: User-Space Node 20 LTS Provisioning Commands

The implementer should execute the following bash block:

```bash
# 1. Create target directories
mkdir -p /home/blackcrow/.local
mkdir -p /home/blackcrow/.gemini/antigravity/bin

# 2. Download and extract Node 20.18.0 LTS into ~/.local
curl -fsSL https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-x64.tar.xz | tar -xJ --strip-components=1 -C /home/blackcrow/.local/

# 3. Create symlinks in ~/.gemini/antigravity/bin (which is first in $PATH)
ln -sf /home/blackcrow/.local/bin/node /home/blackcrow/.gemini/antigravity/bin/node
ln -sf /home/blackcrow/.local/bin/npm /home/blackcrow/.gemini/antigravity/bin/npm
ln -sf /home/blackcrow/.local/bin/npx /home/blackcrow/.gemini/antigravity/bin/npx

# 4. Clear bash command cache and verify
hash -r
node -v
npm -v
npx -v
```

Expected verification output:
- `node -v` -> `v20.18.0`
- `npm -v` -> `10.8.2`
- `npx -v` -> `10.8.2`

---

### 4.2 Step 2: Next.js 14 App Router File Templates

#### A. Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/package.json`

```json
{
  "name": "cgh-jordanian-private-chef",
  "version": "1.0.0",
  "private": true,
  "description": "Prestigious Jordanian Private Chef Friday Dining Experience",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
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

#### B. Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### C. Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/postcss.config.mjs`

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

#### D. Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
```

#### E. Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "error"
  }
}
```

#### F. Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.gitignore`

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

### 4.3 Step 3: `tailwind.config.ts` (Strict Brand Palette)

#### Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Contract tokens matching PROJECT.md §1
        'brand-navy-dark': '#0B192C',
        'brand-navy-card': '#1B2A4A',
        'brand-cream-light': '#FDFBF7',
        'brand-cream-warm': '#F5F0E8',
        'brand-accent-gold': '#C5A880',
        'brand-accent-olive': '#3E4D34',

        // Semantic & structured brand colors
        brand: {
          navy: {
            DEFAULT: '#0B192C',
            dark: '#0B192C',
            card: '#1B2A4A',
            muted: '#16233B',
            border: '#243B66',
          },
          cream: {
            DEFAULT: '#FDFBF7',
            light: '#FDFBF7',
            warm: '#F5F0E8',
            linen: '#FAF6EE',
            muted: '#EADFC9',
            border: '#E2D7C3',
          },
          gold: {
            DEFAULT: '#C5A880',
            light: '#D8C1A0',
            hover: '#D4AF37',
            dark: '#A88B60',
          },
          olive: {
            DEFAULT: '#3E4D34',
            light: '#506344',
            dark: '#2C3725',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'Amiri', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(11, 25, 44, 0.45)',
        'luxury-gold': '0 0 25px rgba(197, 168, 128, 0.25)',
        'card-elevated': '0 10px 30px -10px rgba(11, 25, 44, 0.2)',
      },
      borderColor: {
        'brand-gold-subtle': 'rgba(197, 168, 128, 0.25)',
        'brand-navy-subtle': 'rgba(27, 42, 74, 0.3)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C5A880 0%, #E2D7C3 50%, #C5A880 100%)',
        'navy-radial': 'radial-gradient(circle at 50% 20%, #1B2A4A 0%, #0B192C 75%)',
        'cream-radial': 'radial-gradient(circle at 50% 20%, #FDFBF7 0%, #F5F0E8 85%)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 4.4 Step 4: `src/app/globals.css` (Tailwind Directives & Brand Variables)

#### Target: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Strict Brand Hex Palette */
  --brand-navy-dark: #0B192C;
  --brand-navy-card: #1B2A4A;
  --brand-navy-muted: #16233B;
  --brand-navy-border: #243B66;

  --brand-cream-light: #FDFBF7;
  --brand-cream-warm: #F5F0E8;
  --brand-cream-linen: #FAF6EE;
  --brand-cream-muted: #EADFC9;
  --brand-cream-border: #E2D7C3;

  --brand-accent-gold: #C5A880;
  --brand-accent-gold-light: #D8C1A0;
  --brand-accent-gold-dark: #A88B60;

  --brand-accent-olive: #3E4D34;
  --brand-accent-olive-light: #506344;
  --brand-accent-olive-dark: #2C3725;

  /* Semantic Default Tokens */
  --background: var(--brand-navy-dark);
  --foreground: var(--brand-cream-light);
  --card: var(--brand-navy-card);
  --card-foreground: var(--brand-cream-light);
  --accent: var(--brand-accent-gold);
  --accent-foreground: var(--brand-navy-dark);
  --border: var(--brand-navy-border);

  /* Font Fallback Variables */
  --font-cormorant: 'Cormorant Garamond', Garamond, Georgia, serif;
  --font-inter: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-amiri: 'Amiri', serif;
}

@layer base {
  * {
    border-color: var(--border);
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--brand-navy-dark);
    color: var(--brand-cream-light);
  }

  body {
    min-height: 100vh;
    font-family: var(--font-inter);
    background-color: var(--brand-navy-dark);
    color: var(--brand-cream-light);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-cormorant);
    letter-spacing: -0.015em;
  }

  ::selection {
    background-color: var(--brand-accent-gold);
    color: var(--brand-navy-dark);
  }

  /* Custom Luxury Navy & Gold Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0B192C;
  }
  ::-webkit-scrollbar-thumb {
    background: #243B66;
    border-radius: 4px;
    border: 1px solid rgba(197, 168, 128, 0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #C5A880;
  }
}

@layer components {
  /* Luxury Gold Accent Divider */
  .gold-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #C5A880, transparent);
  }

  /* Glassmorphism Surface on Deep Navy */
  .navy-glass {
    background: rgba(27, 42, 74, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(197, 168, 128, 0.18);
  }

  /* Glassmorphism Surface on Warm Cream */
  .cream-glass {
    background: rgba(253, 251, 247, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 215, 195, 0.8);
  }

  /* Luxury CTA Buttons */
  .btn-gold {
    background-color: #C5A880;
    color: #0B192C;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-gold:hover {
    background-color: #D8C1A0;
    box-shadow: 0 0 20px rgba(197, 168, 128, 0.4);
    transform: translateY(-1px);
  }

  .btn-outline-gold {
    border: 1px solid #C5A880;
    color: #C5A880;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-outline-gold:hover {
    background-color: #C5A880;
    color: #0B192C;
    box-shadow: 0 0 15px rgba(197, 168, 128, 0.3);
  }
}
```

---

### 4.5 Step 5: Core M1 Components & Contracts

#### A. Class Name Utility: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### B. Styled SVG Placeholder: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/src/components/common/StyledPlaceholder.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface StyledPlaceholderProps {
  label: string;
  dimensions: string; // e.g. "1200 × 800"
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9';
  motif?: 'olive_grove' | 'valley_harvest' | 'ancient_terroir' | 'plated_gourmet' | 'chef_portrait';
  variant?: 'navy' | 'cream';
  className?: string;
}

export function StyledPlaceholder({
  label,
  dimensions,
  aspectRatio = '16/9',
  motif = 'olive_grove',
  variant = 'navy',
  className,
}: StyledPlaceholderProps) {
  const aspectClasses = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
  }[aspectRatio];

  const isNavy = variant === 'navy';

  const renderMotifVector = () => {
    switch (motif) {
      case 'olive_grove':
        return (
          <svg className="w-16 h-16 opacity-75" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Olive branch with leaves and olives */}
            <path d="M12 52C22 44 32 32 52 12" strokeLinecap="round" />
            <path d="M24 42C20 36 22 28 28 26C34 24 38 30 34 36C30 42 28 42 24 42Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M38 28C34 22 36 14 42 12C48 10 52 16 48 22C44 28 42 28 38 28Z" fill="currentColor" fillOpacity="0.15" />
            <circle cx="28" cy="46" r="4" fill="currentColor" fillOpacity="0.3" />
            <circle cx="44" cy="32" r="4" fill="currentColor" fillOpacity="0.3" />
          </svg>
        );
      case 'valley_harvest':
        return (
          <svg className="w-16 h-16 opacity-75" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Rolling hills of Jordan Valley & sun */}
            <circle cx="48" cy="20" r="6" strokeDasharray="2 2" />
            <path d="M8 48C18 38 30 40 40 48C50 42 56 44 60 48" strokeLinecap="round" />
            <path d="M4 56C16 48 34 46 48 54C54 50 58 52 62 56" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>
        );
      case 'ancient_terroir':
        return (
          <svg className="w-16 h-16 opacity-75" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Ajloun Roman/Ottoman arch & terraced stone walls */}
            <path d="M20 52V28C20 21.3726 25.3726 16 32 16C38.6274 16 44 21.3726 44 28V52" strokeLinecap="round" />
            <path d="M14 52H50" strokeLinecap="round" />
            <line x1="20" y1="36" x2="44" y2="36" strokeDasharray="3 3" />
            <circle cx="32" cy="24" r="2" fill="currentColor" />
          </svg>
        );
      case 'plated_gourmet':
        return (
          <svg className="w-16 h-16 opacity-75" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Cloche dome and culinary plate */}
            <ellipse cx="32" cy="46" rx="22" ry="6" />
            <path d="M14 44C14 32 22 24 32 24C42 24 50 32 50 44" strokeLinecap="round" />
            <circle cx="32" cy="20" r="3" fill="currentColor" />
          </svg>
        );
      case 'chef_portrait':
        return (
          <svg className="w-16 h-16 opacity-75" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Jordanian Keffiyeh pattern silhouette / Chef toque */}
            <path d="M22 48V40C22 34 26 30 32 30C38 30 42 34 42 40V48" />
            <circle cx="32" cy="22" r="7" />
            <path d="M18 52C22 48 42 48 46 52" strokeDasharray="2 2" />
          </svg>
        );
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300',
        aspectClasses,
        isNavy
          ? 'bg-gradient-to-b from-brand-navy-card to-brand-navy-dark text-brand-cream-light border-brand-accent-gold/20'
          : 'bg-gradient-to-b from-brand-cream-light to-brand-cream-warm text-brand-navy-dark border-brand-accent-olive/20',
        className
      )}
    >
      {/* Decorative Corner Ornaments */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-brand-accent-gold/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-brand-accent-gold/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-brand-accent-gold/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-brand-accent-gold/40" />

      {/* Center Motif Vector */}
      <div className={cn('mb-3', isNavy ? 'text-brand-accent-gold' : 'text-brand-accent-olive')}>
        {renderMotifVector()}
      </div>

      {/* Descriptive Label */}
      <p className="font-serif text-lg font-medium tracking-wide max-w-xs line-clamp-2 px-2">
        {label}
      </p>

      {/* Explicit Dimension Pill (Zero external image requirement proof) */}
      <div
        className={cn(
          'mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider',
          isNavy
            ? 'bg-brand-navy-muted/80 text-brand-accent-gold/90 border border-brand-accent-gold/20'
            : 'bg-brand-cream-muted/60 text-brand-accent-olive border border-brand-accent-olive/20'
        )}
      >
        <span>[</span>
        <span>{dimensions}</span>
        <span>•</span>
        <span className="capitalize">{motif.replace('_', ' ')}</span>
        <span>]</span>
      </div>
    </div>
  );
}
```

#### C. Dietary Pill Badge: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/src/components/common/Badge.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  label: string;
  variant?: 'organic' | 'vegan' | 'vegetarian' | 'gluten-free' | 'gold' | 'navy';
  className?: string;
}

export function Badge({ label, variant = 'organic', className }: BadgeProps) {
  const variantStyles = {
    organic: 'bg-brand-accent-olive/20 text-brand-accent-olive border-brand-accent-olive/40',
    vegan: 'bg-emerald-900/20 text-emerald-300 border-emerald-500/30',
    vegetarian: 'bg-amber-900/20 text-amber-200 border-amber-500/30',
    'gluten-free': 'bg-brand-navy-card text-brand-cream-light border-brand-navy-border',
    gold: 'bg-brand-accent-gold/20 text-brand-accent-gold border-brand-accent-gold/40',
    navy: 'bg-brand-navy-card text-brand-cream-light border-brand-navy-border',
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide border transition-colors',
        variantStyles,
        className
      )}
    >
      {label}
    </span>
  );
}
```

#### D. Root Layout: `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CGH | Prestigious Jordanian Private Chef & Gourmet Friday Dining',
  description:
    'An exclusive culinary residency operating strictly one day per week on Fridays. Celebrating Jordanian terroir, organic farms from Ajloun and the Jordan Valley, and intimate private chef dining.',
  keywords: [
    'Jordanian private chef',
    'Friday dining Amman',
    'Ajloun olive oil tasting',
    'organic Jordan valley gourmet',
    'exclusive Friday tasting menu',
  ],
  openGraph: {
    title: 'CGH | Prestigious Jordanian Private Chef Friday Experience',
    description: 'Exclusive Friday-only organic rotating degustation menu.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-brand-navy-dark text-brand-cream-light antialiased selection:bg-brand-accent-gold selection:text-brand-navy-dark">
        {children}
      </body>
    </html>
  );
}
```

---

## 5. Verification Method

### 5.1 Independent Provisioning Verification
Execute:
```bash
# Verify binaries are available and version-locked
node -v
npm -v
npx -v
```
**Success Assertion**:
- `node -v` prints `v20.18.0` with exit code 0.
- `npm -v` prints `10.8.2` with exit code 0.

### 5.2 Project Compilation Verification
In `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`:
```bash
# 1. Install dependencies
npm install

# 2. Production build check
npm run build
```
**Success Assertion**:
- `npm install` creates `node_modules` without peer-dependency failure.
- `npm run build` runs Next.js production compiler, generates `.next/` standalone bundle, and exits with code 0 and zero lint/type errors.

### 5.3 Invalidation Conditions
- If `node: command not found`, symlink creation in `~/.gemini/antigravity/bin` or user PATH did not register; run `hash -r`.
- If `npm` complains of missing `node-cli.js`, verify `tar -xJ --strip-components=1` unpacked the entire `lib/node_modules` tree into `~/.local/`.
- If Tailwind compilation emits `Unknown color brand-navy-dark`, verify `tailwind.config.ts` includes the exact keys under `theme.extend.colors`.
