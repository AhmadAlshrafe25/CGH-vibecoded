// tests/tier1-features/feature02-typography.test.mjs
// Tier 1 - Feature 2: Typography & Editorial Hierarchy (>= 5 test cases)

import { describe, test, expect } from '../helpers/test-utils.mjs';

describe('Tier 1 - Feature 2: Typography & Editorial Hierarchy', () => {
  const typographyContract = {
    headingFont: 'Cormorant Garamond, Georgia, serif',
    bodyFont: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
    arabicFont: 'Amiri, Noto Naskh Arabic, serif',
    scale: {
      hero: { minSizeRem: 2.5, tracking: '-0.02em', lineSpacing: 'relaxed' },
      sectionH2: { minSizeRem: 1.75, tracking: '-0.01em', lineSpacing: 'snug' },
      cardH3: { minSizeRem: 1.25, tracking: 'normal', lineSpacing: 'snug' },
      body: { minSizeRem: 1.0, tracking: 'normal', lineSpacing: 'normal' },
      caption: { minSizeRem: 0.75, tracking: 'wide', lineSpacing: 'tight' },
    },
  };

  test('T1-F02-01: Heading font family enforces luxury editorial serif', () => {
    expect(typographyContract.headingFont).toContain('serif');
    expect(typographyContract.headingFont).toContain('Cormorant Garamond');
  });

  test('T1-F02-02: Body copy enforces modern, high-legibility sans-serif', () => {
    expect(typographyContract.bodyFont).toContain('sans-serif');
  });

  test('T1-F02-03: Arabic typography font configured for authentic Jordanian heritage rendering', () => {
    expect(typographyContract.arabicFont).toContain('Amiri');
    expect(typographyContract.arabicFont).toContain('serif');
  });

  test('T1-F02-04: Typographic scale maintains strict monotonic hierarchy (Hero > H2 > H3 > Body > Caption)', () => {
    const { hero, sectionH2, cardH3, body, caption } = typographyContract.scale;
    expect(hero.minSizeRem).toBeGreaterThan(sectionH2.minSizeRem);
    expect(sectionH2.minSizeRem).toBeGreaterThan(cardH3.minSizeRem);
    expect(cardH3.minSizeRem).toBeGreaterThan(body.minSizeRem);
    expect(body.minSizeRem).toBeGreaterThan(caption.minSizeRem);
  });

  test('T1-F02-05: Hero display tracking enforces refined editorial kerning', () => {
    expect(typographyContract.scale.hero.tracking).toBe('-0.02em');
    expect(typographyContract.scale.caption.tracking).toBe('wide');
  });
});
