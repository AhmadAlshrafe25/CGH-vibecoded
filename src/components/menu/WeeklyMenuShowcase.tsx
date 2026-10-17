'use client';

import React, { useState } from 'react';
import { weeklyMenus } from '@/data/weeklyMenuData';
import { CourseCategory, DietaryPreference, WeeklyMenu } from '@/types/menu';
import { DietaryBadge } from '@/components/common/Badge';
import { StyledPlaceholder } from '@/components/common/StyledPlaceholder';

export interface WeeklyMenuShowcaseProps {
  onOpenReservation: () => void;
}

export const WeeklyMenuShowcase: React.FC<WeeklyMenuShowcaseProps> = ({ onOpenReservation }) => {
  const [selectedMenuId, setSelectedMenuId] = useState<string>(weeklyMenus[0].id);
  const [activeCategory, setActiveCategory] = useState<CourseCategory | 'all'>('all');
  const [selectedDietaryFilter, setSelectedDietaryFilter] = useState<DietaryPreference | 'all'>('all');

  const currentMenu: WeeklyMenu =
    weeklyMenus.find((m) => m.id === selectedMenuId) || weeklyMenus[0];

  const categories: { id: CourseCategory | 'all'; label: string; arabic: string }[] = [
    { id: 'all', label: 'Complete 4-Course Tasting', arabic: 'كامل المأدبة' },
    { id: 'starters', label: 'Starters & Mezze', arabic: 'المقبلات' },
    { id: 'mains', label: 'Principal Courses', arabic: 'الأطباق الرئيسية' },
    { id: 'dessert', label: 'Sweet Conclusion', arabic: 'التحلية' },
    { id: 'pairings', label: 'Botanical Pairings', arabic: 'المشروبات' },
  ];

  const dietaryOptions: { id: DietaryPreference | 'all'; label: string }[] = [
    { id: 'all', label: 'All Dishes' },
    { id: 'organic', label: 'Organic Certified' },
    { id: 'vegan', label: 'Plant-Based' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'vegetarian', label: 'Vegetarian' },
  ];

  // Filter courses and items
  const filteredCourses = currentMenu.courses
    .filter((course) => activeCategory === 'all' || course.category === activeCategory)
    .map((course) => {
      const items = course.items.filter((item) => {
        if (selectedDietaryFilter === 'all') return true;
        return item.dietary.includes(selectedDietaryFilter);
      });
      return { ...course, items };
    })
    .filter((course) => course.items.length > 0);

  return (
    <section id="menu" className="py-24 px-6 bg-[#0B192C] border-t border-[#1B2A4A] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header & Cadence Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1B2A4A]">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              <span>Curated Friday Gastronomy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7]">
              The Rotating Friday Menu
            </h2>
            <p className="text-sm text-[#F5F0E8]/70 max-w-2xl font-light">
              Crafted fresh every seven days. We serve our seasonal multi-course menu exclusively during our Friday services (Afternoon Terrace &amp; Evening Starlight Salon).
            </p>
          </div>

          {/* Week Edition Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#1B2A4A]/60 border border-[#1B2A4A]">
            {weeklyMenus.map((menu) => {
              const isActive = menu.id === selectedMenuId;
              return (
                <button
                  key={menu.id}
                  onClick={() => setSelectedMenuId(menu.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#C5A880] text-[#0B192C] font-semibold shadow-md'
                      : 'text-[#F5F0E8]/70 hover:text-[#FDFBF7] hover:bg-[#1B2A4A]'
                  }`}
                >
                  <span className="block font-bold">Week #{menu.weekNumber}</span>
                  <span className="text-[10px] opacity-80">{menu.activeFridayFormatted.split(',')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Week Banner Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#1B2A4A]/40 border border-[#C5A880]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-[#3E4D34]/40 text-[#A3B899] border border-[#3E4D34]">
                Service Date: {currentMenu.activeFridayFormatted}
              </span>
              <span className="text-xs font-serif text-[#C5A880] italic">
                {currentMenu.seasonName}
              </span>
            </div>
            <p className="text-base font-serif text-[#FDFBF7] font-medium">
              “{currentMenu.themeSummary}”
            </p>
            <p className="text-xs text-[#F5F0E8]/70 italic max-w-3xl">
              Tasting note from Chef Tariq: {currentMenu.chefTastingNotes}
            </p>
          </div>

          <button
            onClick={onOpenReservation}
            className="px-6 py-3 rounded text-xs font-semibold bg-[#C5A880] text-[#0B192C] hover:bg-[#FDFBF7] transition-all whitespace-nowrap shadow-lg active:scale-95"
          >
            Reserve for this Friday
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1B2A4A] text-[#C5A880] border border-[#C5A880]/50'
                      : 'text-[#F5F0E8]/60 hover:text-[#FDFBF7] border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#F5F0E8]/50 text-xs font-mono mr-1">Filter Dietary:</span>
            {dietaryOptions.map((opt) => {
              const isSelected = selectedDietaryFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDietaryFilter(opt.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                    isSelected
                      ? 'bg-[#3E4D34] text-[#FDFBF7] border border-[#A3B899]'
                      : 'bg-[#1B2A4A]/40 text-[#F5F0E8]/70 border border-[#1B2A4A] hover:border-[#C5A880]/40'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Courses & Dishes Grid */}
        <div className="space-y-12">
          {filteredCourses.map((course) => (
            <div key={course.category} className="space-y-6">
              <div className="border-b border-[#1B2A4A] pb-3 flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#FDFBF7]">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#F5F0E8]/60 font-light mt-0.5">
                    {course.subtitle}
                  </p>
                </div>
                <span className="font-serif text-lg text-[#C5A880]/80 font-medium">
                  {course.arabicTitle}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {course.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-[#1B2A4A]/30 border border-[#1B2A4A] hover:border-[#C5A880]/50 transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-4">
                      {/* Styled Nature / Plating Placeholder */}
                      <StyledPlaceholder
                        label={item.placeholder.label}
                        dimensions={item.placeholder.dimensions}
                        aspectRatio="16/9"
                        motif={item.placeholder.motif}
                        variant="navy"
                      />

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-serif text-xl font-bold text-[#FDFBF7] group-hover:text-[#C5A880] transition-colors">
                            {item.name}
                          </h4>
                          <span className="font-serif text-sm text-[#C5A880] block mt-0.5">
                            {item.arabicName}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#F5F0E8]/80 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Terroir Origin Stamp */}
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#A3B899]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A3B899]" />
                        <span>Sourcing: {item.origin}</span>
                      </div>

                      {/* Key Ingredients List */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.keyIngredients.map((ing) => (
                          <span
                            key={ing}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0B192C] text-[#F5F0E8]/70 border border-[#1B2A4A]"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>

                      {/* Beverage Pairing Suggestion */}
                      {item.beveragePairing && (
                        <div className="mt-3 p-3 rounded-lg bg-[#0B192C]/80 border border-[#C5A880]/20 text-xs">
                          <span className="font-serif font-bold text-[#C5A880] block mb-0.5">
                            Botanical Pairing Recommendation:
                          </span>
                          <span className="font-medium text-[#FDFBF7]">
                            {item.beveragePairing.name}
                          </span>
                          <p className="text-[#F5F0E8]/60 text-[11px] mt-0.5">
                            {item.beveragePairing.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Dietary Badges */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1B2A4A]/60">
                      {item.dietary.map((diet) => (
                        <DietaryBadge key={diet} type={diet} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyMenuShowcase;
