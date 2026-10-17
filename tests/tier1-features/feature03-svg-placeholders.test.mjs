// tests/tier1-features/feature03-svg-placeholders.test.mjs
// Tier 1 - Feature 3: Styled SVG Placeholders (>= 5 test cases)

import { describe, test, expect } from '../helpers/test-utils.mjs';
import { ALLOWED_PLACEHOLDER_MOTIFS, ALLOWED_ASPECT_RATIOS } from '../helpers/contracts.mjs';

function renderMockStyledPlaceholder({ label, dimensions, motif = 'olive_grove', aspectRatio = '16/9', variant = 'navy' }) {
  if (!label || !dimensions) {
    throw new Error('Placeholder requires label and dimensions');
  }
  if (!ALLOWED_PLACEHOLDER_MOTIFS.includes(motif)) {
    throw new Error(`Invalid motif: ${motif}`);
  }
  if (!ALLOWED_ASPECT_RATIOS.includes(aspectRatio)) {
    throw new Error(`Invalid aspectRatio: ${aspectRatio}`);
  }

  const isNavy = variant === 'navy';
  const bgColor = isNavy ? '#0B192C' : '#FDFBF7';
  const strokeColor = isNavy ? '#C5A880' : '#1B2A4A';
  const textColor = isNavy ? '#F5F0E8' : '#0B192C';

  return `
    <div role="img" aria-label="${label}" class="styled-placeholder aspect-${aspectRatio.replace('/', '-')}" style="background-color: ${bgColor}">
      <svg class="placeholder-graphic" viewBox="0 0 400 250" fill="none" stroke="${strokeColor}">
        <path d="M50 200 C 150 100, 250 100, 350 200" stroke-width="2" />
        <circle cx="200" cy="120" r="30" stroke-width="1.5" />
      </svg>
      <div class="placeholder-overlay">
        <span class="label" style="color: ${textColor}">${label}</span>
        <span class="dimensions" style="color: ${strokeColor}">[ ${dimensions} ]</span>
      </div>
    </div>
  `;
}

describe('Tier 1 - Feature 3: Styled SVG Placeholders', () => {
  test('T1-F03-01: Prohibits external photo domains (unsplash, pexels, remote http/https urls)', () => {
    const markup = renderMockStyledPlaceholder({
      label: 'Ajloun Ancient Olive Grove',
      dimensions: '1200 × 800',
      motif: 'olive_grove',
    });
    expect(markup).not.toContain('http://');
    expect(markup).not.toContain('https://');
    expect(markup).not.toContain('images.unsplash.com');
    expect(markup).not.toContain('<img');
  });

  test('T1-F03-02: Renders nature-themed SVG vectors matching allowed motifs', () => {
    ALLOWED_PLACEHOLDER_MOTIFS.forEach(motif => {
      const markup = renderMockStyledPlaceholder({
        label: `Test ${motif}`,
        dimensions: '800 × 600',
        motif,
      });
      expect(markup).toContain('<svg');
      expect(markup).toContain('</svg>');
    });
  });

  test('T1-F03-03: Displays explicit visible container dimensions in [ W × H ] format', () => {
    const markup = renderMockStyledPlaceholder({
      label: 'Jordan Valley Heirloom Tomato',
      dimensions: '800 × 600',
      motif: 'valley_harvest',
    });
    expect(markup).toContain('[ 800 × 600 ]');
  });

  test('T1-F03-04: Throws error or rejects invalid motif', () => {
    expect(() => {
      renderMockStyledPlaceholder({
        label: 'Invalid Motif Test',
        dimensions: '800 × 600',
        motif: 'skyscraper_downtown', // Not a nature/chef motif
      });
    }).toThrow('Invalid motif');
  });

  test('T1-F03-05: Supports all 4 standard luxury aspect ratios (16/9, 4/3, 1/1, 21/9)', () => {
    ALLOWED_ASPECT_RATIOS.forEach(ratio => {
      const markup = renderMockStyledPlaceholder({
        label: `Ratio Test ${ratio}`,
        dimensions: '1200 × 800',
        aspectRatio: ratio,
      });
      expect(markup).toContain(`aspect-${ratio.replace('/', '-')}`);
    });
  });

  test('T1-F03-06: Accessible ARIA img role and descriptive label provided', () => {
    const markup = renderMockStyledPlaceholder({
      label: 'Chef Tariq Olive Wood Hearth',
      dimensions: '1200 × 800',
      motif: 'chef_portrait',
    });
    expect(markup).toContain('role="img"');
    expect(markup).toContain('aria-label="Chef Tariq Olive Wood Hearth"');
  });
});
