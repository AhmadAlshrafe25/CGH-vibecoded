// tests/tier1-features/feature01-brand-palette.test.mjs
// Tier 1 - Feature 1: Strict Navy & Cream Palette (>= 5 test cases)

import { describe, test, expect } from '../helpers/test-utils.mjs';
import { BRAND_PALETTE } from '../helpers/contracts.mjs';
import fs from 'node:fs';
import path from 'node:path';

describe('Tier 1 - Feature 1: Strict Navy & Cream Palette', () => {
  test('T1-F01-01: Primary Dark Navy hex code strictly matches #0B192C', () => {
    expect(BRAND_PALETTE.navyDark).toBe('#0B192C');
    expect(/^#0B192C$/i.test(BRAND_PALETTE.navyDark)).toBe(true);
  });

  test('T1-F01-02: Secondary Slate Navy hex code strictly matches #1B2A4A', () => {
    expect(BRAND_PALETTE.navyCard).toBe('#1B2A4A');
    expect(/^#1B2A4A$/i.test(BRAND_PALETTE.navyCard)).toBe(true);
  });

  test('T1-F01-03: Primary Cream Light hex code strictly matches #FDFBF7', () => {
    expect(BRAND_PALETTE.creamLight).toBe('#FDFBF7');
    expect(/^#FDFBF7$/i.test(BRAND_PALETTE.creamLight)).toBe(true);
  });

  test('T1-F01-04: Warm Linen Cream hex code strictly matches #F5F0E8', () => {
    expect(BRAND_PALETTE.creamWarm).toBe('#F5F0E8');
    expect(/^#F5F0E8$/i.test(BRAND_PALETTE.creamWarm)).toBe(true);
  });

  test('T1-F01-05: Artisanal Gold (#C5A880) and Organic Olive (#3E4D34) accents defined', () => {
    expect(BRAND_PALETTE.accentGold).toBe('#C5A880');
    expect(BRAND_PALETTE.accentOlive).toBe('#3E4D34');
  });

  test('T1-F01-06: Luminance contrast between Navy Dark and Cream Light exceeds WCAG AAA (>= 7:1)', () => {
    // Relative luminance calculation
    function getLuminance(hex) {
      const rgb = parseInt(hex.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      const [rs, gs, bs] = [r, g, b].map(c => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    const lumNavy = getLuminance(BRAND_PALETTE.navyDark);
    const lumCream = getLuminance(BRAND_PALETTE.creamLight);
    const contrastRatio = (Math.max(lumNavy, lumCream) + 0.05) / (Math.min(lumNavy, lumCream) + 0.05);
    expect(contrastRatio).toBeGreaterThanOrEqual(10.0); // Ultra-high contrast ~15:1
  });
});
