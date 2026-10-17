import React from 'react';
import { StyledPlaceholder } from '@/components/common/StyledPlaceholder';

export const TerroirShowcase: React.FC = () => {
  const terroirRegions = [
    {
      title: 'Ajloun Highlands',
      arabic: 'مرتفعات عجلون',
      feature: 'Ancient Nabali Green Olives & Wild Mountain Thyme',
      description: 'Mountain orchards sitting at 1,000m altitude where olive trees have stood for 300+ years, yielding peppery, antioxidant-rich first-press oil.',
      motif: 'olive_grove' as const,
      dimension: '800 × 500',
    },
    {
      title: 'Jordan Valley (Al-Ghor)',
      arabic: 'الأغوار الأردنية',
      feature: 'Sub-Tropical Heirloom Vegetables & Citrus',
      description: 'The world’s lowest agricultural basin, offering naturally mineralized sun-sweetened tomatoes, sweet baby courgettes, and winter herbs.',
      motif: 'valley_harvest' as const,
      dimension: '800 × 500',
    },
    {
      title: 'Jerash Terraced Valleys',
      arabic: 'وديان جرش',
      feature: 'Wild Sumac Berries, Figs & Forest Mushrooms',
      description: 'Limestone slopes enriched by mountain springs where wild sour sumac and pine forest chanterelles are hand-foraged every autumn.',
      motif: 'ancient_terroir' as const,
      dimension: '800 × 500',
    },
    {
      title: 'Dead Sea Mineral Shores',
      arabic: 'حوض البحر الميت',
      feature: 'Hand-Harvested Pyramid Salt Crystals',
      description: 'Pure sun-evaporated sea crystals rich in magnesium and essential minerals, adding crisp texture and savory balance to chef desserts.',
      motif: 'ancient_terroir' as const,
      dimension: '800 × 500',
    },
  ];

  return (
    <section id="terroir" className="py-24 px-6 bg-[#0B192C] border-t border-[#1B2A4A] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            The Terroir of Jordan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7]">
            A Map of Local Sourcing &amp; Artisanal Partnerships
          </h2>
          <p className="text-sm sm:text-base text-[#F5F0E8]/75 font-light leading-relaxed">
            Every ingredient that touches Chef Tariq’s Friday table can be traced directly to a specific family farm, grove, or forager within the Jordanian kingdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {terroirRegions.map((region) => (
            <div
              key={region.title}
              className="flex flex-col rounded-xl bg-[#1B2A4A]/40 border border-[#1B2A4A] overflow-hidden hover:border-[#C5A880]/50 transition-all duration-300 group"
            >
              <StyledPlaceholder
                label={region.title}
                dimensions={region.dimension}
                aspectRatio="16/9"
                motif={region.motif}
                variant="navy"
              />
              <div className="p-5 flex flex-col flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#FDFBF7] group-hover:text-[#C5A880] transition-colors">
                    {region.title}
                  </h3>
                  <span className="font-serif text-xs text-[#C5A880]/90 font-medium">
                    {region.arabic}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#A3B899] font-medium block">
                  {region.feature}
                </span>
                <p className="text-xs text-[#F5F0E8]/70 leading-relaxed flex-grow pt-1">
                  {region.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerroirShowcase;
