import React from 'react';
import { StyledPlaceholder } from '@/components/common/StyledPlaceholder';

export const ChefStorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 px-6 bg-[#0B192C] border-t border-[#1B2A4A] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Placeholders */}
        <div className="lg:col-span-5 space-y-6">
          <StyledPlaceholder
            label="Chef Tariq Al-Amad — Custodian of Levantine Hearthcraft"
            dimensions="800 × 1000"
            aspectRatio="4/3"
            motif="chef_portrait"
            variant="navy"
          />
          <div className="grid grid-cols-2 gap-4">
            <StyledPlaceholder
              label="Ajloun Ancient Terraces"
              dimensions="600 × 400"
              aspectRatio="4/3"
              motif="olive_grove"
              variant="navy"
            />
            <StyledPlaceholder
              label="Dead Sea Salt Harvest"
              dimensions="600 × 400"
              aspectRatio="4/3"
              motif="ancient_terroir"
              variant="navy"
            />
          </div>
        </div>

        {/* Right Column: Culinary Philosophy Narrative */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-[#F5F0E8]">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            <span>The Chef &amp; The Country</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7] leading-tight">
            “True cooking does not alter nature; it listens to it.”
          </h2>

          <div className="space-y-4 text-base font-light leading-relaxed text-[#F5F0E8]/85">
            <p>
              Born and raised among the rolling olive groves and limestone ridges of northern Jordan, <strong>Chef Tariq Al-Amad</strong> considers the land his co-creator. Rather than operating a commercial daily kitchen, he curates an exclusive weekly Friday salon where food is prepared unhurriedly over olive wood hearths.
            </p>
            <p>
              Every Thursday morning, Chef Tariq traverses Jordan’s organic farming valleys—from the rich volcanic soils of Irbid and the mist-covered hills of Ajloun, down to the sun-drenched organic citrus basins of Al-Ghor. He selects each heirloom vegetable, wild herb, and cold-pressed oil personally from trusted family growers.
            </p>
            <p>
              His culinary philosophy blends ancient Levantine generous hospitality (<em>Karam</em>) with modern gourmet finesse. Because each Friday draws solely from that week’s immediate harvest, no two Friday menus are ever identical.
            </p>
          </div>

          {/* Pillars of Integrity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-lg bg-[#1B2A4A]/50 border border-[#1B2A4A]">
              <span className="font-serif text-lg font-semibold text-[#FDFBF7] block mb-1">
                Zero Frozen or Imported Produce
              </span>
              <p className="text-xs text-[#F5F0E8]/70 leading-normal">
                Everything served on Friday was harvested within 72 hours from certified Jordanian organic smallholders.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-[#1B2A4A]/50 border border-[#1B2A4A]">
              <span className="font-serif text-lg font-semibold text-[#FDFBF7] block mb-1">
                Olive-Wood Hearth Cooking
              </span>
              <p className="text-xs text-[#F5F0E8]/70 leading-normal">
                Slow burning prunings from century-old trees lend an irreplaceable, gentle smoke to broths and baked breads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefStorySection;
