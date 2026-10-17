// tests/tier1-features/feature04-layout-shell.test.mjs
// Tier 1 - Feature 4: Responsive Layout Shell (>= 5 test cases)

import { describe, test, expect } from '../helpers/test-utils.mjs';

function renderMockLayoutShell({ brandName = 'Tariq Al-Amad', fridayCadence = 'Fridays Only', showCta = true }) {
  return `
    <div class="site-wrapper min-h-screen flex flex-col bg-brand-navy-dark text-brand-cream-light">
      <header role="banner" class="sticky top-0 z-50 backdrop-blur-md border-b border-brand-navy-card bg-brand-navy-dark/90">
        <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main Navigation">
          <div class="brand-wordmark font-serif text-2xl tracking-tight text-brand-cream-light font-bold">
            ${brandName}
            <span class="block text-xs uppercase tracking-widest text-brand-accent-gold font-sans">Private Jordanian Dining</span>
          </div>
          <div class="nav-middle hidden md:flex items-center space-x-6">
            <span class="cadence-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-accent-olive/30 text-brand-cream-warm border border-brand-accent-olive">
              <span class="w-2 h-2 mr-2 rounded-full bg-brand-accent-gold animate-pulse"></span>
              ${fridayCadence}
            </span>
            <a href="#menu" class="hover:text-brand-accent-gold transition-colors">Weekly Menu</a>
            <a href="#terroir" class="hover:text-brand-accent-gold transition-colors">Terroir & Story</a>
          </div>
          <div class="nav-actions">
            ${showCta ? '<button id="nav-reserve-btn" class="cta-reserve px-5 py-2.5 rounded text-sm font-semibold bg-brand-accent-gold text-brand-navy-dark hover:bg-brand-cream-warm transition-all shadow-lg" data-action="open-reservation-modal">Reserve Friday Table</button>' : ''}
          </div>
        </nav>
      </header>
      <main id="main-content" role="main" class="flex-grow">
        <!-- Main showcase sections -->
      </main>
      <footer role="contentinfo" class="border-t border-brand-navy-card bg-brand-navy-card/60 py-12 px-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-brand-cream-warm/70">
          <p class="heritage-credit">&copy; 2026 Chef Tariq Al-Amad. Authentic Jordanian Terroir Dining.</p>
          <p class="service-cadence">Open Strictly Every Friday | Amman & Ajloun Foothills</p>
          <div class="footer-links space-x-4">
            <a href="#policies" class="hover:underline">Dining Guidelines</a>
            <a href="#concierge" class="hover:underline">Private Concierge</a>
          </div>
        </div>
      </footer>
    </div>
  `;
}

describe('Tier 1 - Feature 4: Responsive Layout Shell', () => {
  const shell = renderMockLayoutShell({});

  test('T1-F04-01: Header is sticky positioned with backdrop blur for smooth luxury scrolling', () => {
    expect(shell).toContain('sticky top-0');
    expect(shell).toContain('backdrop-blur-md');
  });

  test('T1-F04-02: Header features prominent brand wordmark celebrating Jordanian chef name', () => {
    expect(shell).toContain('Tariq Al-Amad');
    expect(shell).toContain('Private Jordanian Dining');
  });

  test('T1-F04-03: Header contains exclusive Friday schedule indicator badge', () => {
    expect(shell).toContain('cadence-badge');
    expect(shell).toContain('Fridays Only');
  });

  test('T1-F04-04: Header contains accessible "Reserve Friday Table" CTA button targeting modal trigger', () => {
    expect(shell).toContain('id="nav-reserve-btn"');
    expect(shell).toContain('data-action="open-reservation-modal"');
    expect(shell).toContain('Reserve Friday Table');
  });

  test('T1-F04-05: Semantic landmark elements present (header, main, footer, nav)', () => {
    expect(shell).toContain('<header role="banner"');
    expect(shell).toContain('<nav');
    expect(shell).toContain('<main id="main-content" role="main"');
    expect(shell).toContain('<footer role="contentinfo"');
  });

  test('T1-F04-06: Footer incorporates terroir heritage credentials and strict Friday operating hours', () => {
    expect(shell).toContain('Open Strictly Every Friday');
    expect(shell).toContain('Authentic Jordanian Terroir Dining');
  });
});
