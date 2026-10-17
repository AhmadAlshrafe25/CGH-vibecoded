// tests/helpers/contracts.mjs
// Authoritative interface contracts and reference models derived from PROJECT.md & ORIGINAL_REQUEST.md

export const BRAND_PALETTE = {
  navyDark: '#0B192C',
  navyCard: '#1B2A4A',
  creamLight: '#FDFBF7',
  creamWarm: '#F5F0E8',
  accentGold: '#C5A880',
  accentOlive: '#3E4D34',
};

export const ALLOWED_PLACEHOLDER_MOTIFS = [
  'olive_grove',
  'valley_harvest',
  'ancient_terroir',
  'plated_gourmet',
  'chef_portrait',
];

export const ALLOWED_ASPECT_RATIOS = ['16/9', '4/3', '1/1', '21/9'];

export const DIETARY_PREFERENCES = [
  'organic',
  'vegan',
  'vegetarian',
  'gluten-free',
  'dairy-free',
  'nut-free',
];

export const COURSE_CATEGORIES = ['starters', 'mains', 'dessert', 'pairings'];

export const SEATING_SLOTS = [
  { id: 'afternoon', title: 'Afternoon Terrace Seating', time: '1:30 PM', atmosphere: 'Sunlit panoramic view of olive orchards' },
  { id: 'sunset', title: 'Sunset Golden Hour Salon', time: '5:30 PM', atmosphere: 'Golden light over the Jordan Valley' },
  { id: 'starlight', title: 'Evening Starlight Salon', time: '7:30 PM', atmosphere: 'Intimate candlelit dining under clear Levantine skies' },
];

export const PRICING_PER_GUEST_JOD = 75;

// Date utilities contract implementation
export const DateUtilsOracle = {
  isFriday(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return false;
    }
    return date.getDay() === 5;
  },

  getUpcomingFridays(count = 4, fromDate = new Date('2026-10-17T00:00:00Z')) {
    const fridays = [];
    const current = new Date(fromDate);
    // Move forward until next Friday
    while (current.getDay() !== 5) {
      current.setDate(current.getDate() + 1);
    }
    for (let i = 0; i < count; i++) {
      fridays.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }
    return fridays;
  },

  validateFridayDate(isoDateString, referenceNow = new Date('2026-10-17T00:00:00Z')) {
    if (!isoDateString || typeof isoDateString !== 'string') {
      return { valid: false, error: 'Date is required' };
    }
    const match = /^\d{4}-\d{2}-\d{2}$/.test(isoDateString);
    if (!match) {
      return { valid: false, error: 'Invalid date format. Expected YYYY-MM-DD.' };
    }
    const date = new Date(isoDateString + 'T00:00:00Z');
    if (isNaN(date.getTime())) {
      return { valid: false, error: 'Invalid calendar date.' };
    }
    // Check day of week
    if (date.getUTCDay() !== 5) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return {
        valid: false,
        error: `Selected date falls on a ${dayNames[date.getUTCDay()]}. Dining is strictly offered on Fridays only.`,
      };
    }
    // Check if in the past relative to referenceNow
    const refDateOnly = new Date(referenceNow.toISOString().split('T')[0] + 'T00:00:00Z');
    if (date.getTime() < refDateOnly.getTime()) {
      return { valid: false, error: 'Past dates are not available for booking.' };
    }
    return { valid: true };
  },

  formatFridayDate(date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `Friday, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  },
};

// Form validation & Reservation Contract
export const ReservationOracle = {
  validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(email.trim());
  },

  validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const clean = phone.replace(/[\s\-()]/g, '');
    // Allow Jordanian local (077/078/079xxxxxxx), Jordan international (+962...), or general E.164
    const jordanianOrE164 = /^(\+?962|0)?7[789]\d{7}$|^\+?[1-9]\d{8,14}$/;
    return jordanianOrE164.test(clean);
  },

  validatePartySize(count) {
    const num = Number(count);
    if (!Number.isInteger(num)) {
      return { valid: false, error: 'Party size must be a whole integer.' };
    }
    if (num <= 0) {
      return { valid: false, error: 'Party size must be at least 1 guest.' };
    }
    if (num > 8) {
      return {
        valid: false,
        error: 'Parties larger than 8 require a Private Salon Buyout request. Please contact our concierge.',
        isBuyout: true,
      };
    }
    return { valid: true };
  },

  validateReservationRequest(req, referenceNow = new Date('2026-10-17T00:00:00Z')) {
    const errors = {};

    // Date validation
    const dateCheck = DateUtilsOracle.validateFridayDate(req.fridayDate, referenceNow);
    if (!dateCheck.valid) {
      errors.fridayDate = dateCheck.error;
    }

    // Slot validation
    if (!req.slotId || !['afternoon', 'sunset', 'starlight'].includes(req.slotId)) {
      errors.slotId = 'Please select a valid seating slot.';
    }

    // Party size validation
    const partyCheck = this.validatePartySize(req.guestCount);
    if (!partyCheck.valid) {
      errors.guestCount = partyCheck.error;
    }

    // Full name validation
    if (!req.fullName || typeof req.fullName !== 'string' || req.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    // Email validation
    if (!this.validateEmail(req.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    // Phone validation
    if (!this.validatePhone(req.phone)) {
      errors.phone = 'Please provide a valid phone number with area/country code.';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },

  generateConfirmation(req) {
    const validation = this.validateReservationRequest(req);
    if (!validation.valid) {
      throw new Error(`Cannot generate confirmation for invalid request: ${JSON.stringify(validation.errors)}`);
    }

    const cleanDate = req.fridayDate.replace(/-/g, '');
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const bookingReference = `JO-FRI-${cleanDate}-${randomHex}`;
    const totalEstimateJOD = req.guestCount * PRICING_PER_GUEST_JOD;

    return {
      ...req,
      bookingReference,
      status: 'confirmed',
      pricingPerGuestJOD: PRICING_PER_GUEST_JOD,
      totalEstimateJOD,
      createdAt: new Date().toISOString(),
      venueAddress: 'The Heritage Pavilion, Olive Groves of Ajloun / Jabal Amman Sanctuary, Jordan',
      arrivalInstructions: 'Valet parking available at private estate gates. Please arrive 15 minutes prior to your seating time for complimentary welcome hibiscus infusion.',
    };
  },
};

// Sample authoritative rotating weekly menus
export const SAMPLE_WEEKLY_MENUS = [
  {
    id: 'week-43-2026',
    weekNumber: 43,
    seasonName: 'Autumn Harvest Edition',
    activeFridayDate: '2026-10-23',
    activeFridayFormatted: 'Friday, October 23, 2026',
    themeSummary: 'Celebrating ancient Ajloun Nabali olive groves and Ghor organic riverbed herbs',
    chefTastingNotes: 'Every plate is anchored by cold-pressed virgin oil pressed less than 72 hours prior in Kufranjah.',
    courses: [
      {
        category: 'starters',
        title: 'Starters & Mezze Elevation',
        arabicTitle: 'المقبلات ومؤونة الأرض',
        subtitle: 'Wild Za’atar, Heirloom Tomatoes & Smoked Labneh',
        items: [
          {
            id: 'item-101',
            name: 'Smoked Ajloun Labneh & Charred Figs',
            arabicName: 'لبنة عجلونية مدخنة مع التين المشوي',
            description: 'Handcrafted goat milk labneh smoked over olive wood, glazed black mission figs, wild mountain za’atar.',
            origin: 'Ajloun Highlands & Dibbeen Foothills',
            keyIngredients: ['Goat labneh', 'Olive wood smoke', 'Organic figs', 'Wild thyme', 'Raw pine honey'],
            dietary: ['organic', 'vegetarian', 'gluten-free'],
            placeholder: {
              label: 'Smoked Labneh & Charred Figs Plating',
              dimensions: '800 × 600',
              motif: 'plated_gourmet',
            },
          },
          {
            id: 'item-102',
            name: 'Jordan Valley Heirloom Tomato Carpaccio',
            arabicName: 'كارباتشيو بندورة الأغوار التراثية',
            description: 'Sun-ripened heritage purple tomatoes, cold-pressed Nabali olive oil, Dead Sea crystal salt flakes.',
            origin: 'Ghor Organic River Basin',
            keyIngredients: ['Heirloom tomatoes', 'Nabali olive oil', 'Dead sea salt', 'Wild mountain sumac'],
            dietary: ['organic', 'vegan', 'gluten-free'],
            placeholder: {
              label: 'Heirloom Tomato Carpaccio Composition',
              dimensions: '800 × 600',
              motif: 'valley_harvest',
            },
          },
        ],
      },
      {
        category: 'mains',
        title: 'Mains: Terroir & Hearth',
        arabicTitle: 'الأطباق الرئيسية ونار الحطب',
        subtitle: 'Free-range Lamb & Ancient Grain Freekeh',
        items: [
          {
            id: 'item-201',
            name: 'Slow-Braised Baladi Lamb over Green Freekeh',
            arabicName: 'كتف خروف بلدي مطهو ببطء على الفريكة الخضراء',
            description: '14-hour wood-fired organic Awassi lamb shoulder, smoked green wheat freekeh, pomegranate reduction, toasted pine nuts.',
            origin: 'Jerash Valleys & Madaba Plains',
            keyIngredients: ['Baladi lamb', 'Green wheat freekeh', 'Pomegranate molasses', 'Jerash pine nuts'],
            dietary: ['organic', 'dairy-free'],
            placeholder: {
              label: 'Wood-Fired Awassi Lamb Shoulder',
              dimensions: '1200 × 800',
              motif: 'plated_gourmet',
            },
          },
          {
            id: 'item-202',
            name: 'Roasted Roman Artichoke & Foraged Morels',
            arabicName: 'أرضي شوكي مشوي مع فطر الغابات',
            description: 'Whole globe artichokes braised in lemon leaf broth, wild northern morels, garlic scape emulsion.',
            origin: 'Ajloun Oak Forest & Jerash Terraces',
            keyIngredients: ['Globe artichoke', 'Wild morels', 'Cold-pressed olive oil', 'Lemon blossoms'],
            dietary: ['organic', 'vegan', 'gluten-free'],
            placeholder: {
              label: 'Braised Forest Morels & Artichoke Heart',
              dimensions: '800 × 600',
              motif: 'ancient_terroir',
            },
          },
        ],
      },
      {
        category: 'dessert',
        title: 'Dessert: Sweet Levantine Nostalgia',
        arabicTitle: 'الحلويات وعسل الجبال',
        subtitle: 'Wild Thyme Honey & Sheep Milk Qashta',
        items: [
          {
            id: 'item-301',
            name: 'Deconstructed Knafeh with Mountain Ashta',
            arabicName: 'كنافة مبتكرة بقشطة الجبال الطبيعية',
            description: 'Crisp golden semolina shreds, warm fresh sheep milk clotted cream, orange blossom syrup, pulverized Mafraq pistachios.',
            origin: 'Amman Heritage Confectionery & Ajloun Dairy',
            keyIngredients: ['Sheep milk ashta', 'Orange blossom', 'Mafraq green pistachios', 'Golden phyllo'],
            dietary: ['organic', 'vegetarian'],
            placeholder: {
              label: 'Deconstructed Artisanal Knafeh',
              dimensions: '800 × 600',
              motif: 'plated_gourmet',
            },
          },
        ],
      },
      {
        category: 'pairings',
        title: 'Botanical & Beverage Pairings',
        arabicTitle: 'المشروبات الطبيعية المرافقة',
        subtitle: 'Infusions from Jordan’s Highlands & Valleys',
        items: [
          {
            id: 'item-401',
            name: 'Smoked Pomegranate & Wild Cardamom Shrub',
            arabicName: 'شراب الرمان المدخن مع الهيل البري',
            description: 'Slow-fermented Jordan Valley pomegranate vinegar, smoked mountain sumac, crushed green cardamom pods.',
            origin: 'Al-Hasa & Jordan Valley Orchards',
            keyIngredients: ['Organic pomegranate', 'Cider shrub', 'Wild cardamom', 'Mountain sparkling spring water'],
            dietary: ['organic', 'vegan', 'gluten-free'],
            placeholder: {
              label: 'Artisanal Botanical Elixir Glass',
              dimensions: '600 × 800',
              motif: 'plated_gourmet',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'week-44-2026',
    weekNumber: 44,
    seasonName: 'Jordan Valley Citrus & Herb Edition',
    activeFridayDate: '2026-10-30',
    activeFridayFormatted: 'Friday, October 30, 2026',
    themeSummary: 'Subtropical citrus blossoms, heirloom winter squashes, and smoked sea salt from the Dead Sea',
    chefTastingNotes: 'A vibrant, aromatic transition toward the winter solstice celebrating citrus orchards.',
    courses: [
      {
        category: 'starters',
        title: 'Starters: Citrus & Orchard Flora',
        arabicTitle: 'مقبلات الحمضيات البرية',
        subtitle: 'Grapefruit, Bitter Orange & Roasted Beetroot',
        items: [
          {
            id: 'item-501',
            name: 'Charred Orange Blossom Beets & Labneh',
            arabicName: 'شمندر مشوي بماء زهر الليمون مع اللبنة',
            description: 'Ember-roasted organic yellow and ruby beets, bitter orange zest, whipped buffalo labneh.',
            origin: 'Jordan Valley Groves',
            keyIngredients: ['Yellow beets', 'Bitter orange', 'Whipped labneh', 'Mint oil'],
            dietary: ['organic', 'vegetarian', 'gluten-free'],
            placeholder: {
              label: 'Charred Beets with Bitter Orange',
              dimensions: '800 × 600',
              motif: 'valley_harvest',
            },
          },
        ],
      },
    ],
  },
];
