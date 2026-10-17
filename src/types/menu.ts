export type DietaryPreference = 'organic' | 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-free';
export type CourseCategory = 'starters' | 'mains' | 'dessert' | 'pairings';

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  origin: string;
  keyIngredients: string[];
  dietary: DietaryPreference[];
  beveragePairing?: {
    name: string;
    description: string;
  };
  placeholder: {
    label: string;
    dimensions: string;
    motif: 'olive_grove' | 'valley_harvest' | 'ancient_terroir' | 'plated_gourmet';
  };
}

export interface MenuCourse {
  category: CourseCategory;
  title: string;
  arabicTitle: string;
  subtitle: string;
  items: MenuItem[];
}

export interface WeeklyMenu {
  id: string;
  weekNumber: number;
  seasonName: string;
  activeFridayDate: string; // "YYYY-MM-DD"
  activeFridayFormatted: string; // "Friday, October 23, 2026"
  themeSummary: string;
  chefTastingNotes: string;
  courses: MenuCourse[];
}
