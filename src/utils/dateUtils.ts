export const DateUtils = {
  isFriday(date: Date): boolean {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return false;
    }
    return date.getDay() === 5;
  },

  getUpcomingFridays(count: number = 4, fromDate: Date = new Date()): Date[] {
    const fridays: Date[] = [];
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

  validateFridayDate(
    isoDateString: string,
    referenceNow: Date = new Date()
  ): { valid: boolean; error?: string } {
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
    // Check day of week (Friday is 5)
    if (date.getUTCDay() !== 5) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return {
        valid: false,
        error: `Selected date falls on a ${dayNames[date.getUTCDay()]}. Dining is strictly offered on Fridays only.`,
      };
    }
    // Check if in past relative to referenceNow
    const refDateOnly = new Date(referenceNow.toISOString().split('T')[0] + 'T00:00:00Z');
    if (date.getTime() < refDateOnly.getTime()) {
      return { valid: false, error: 'Past dates are not available for booking.' };
    }
    return { valid: true };
  },

  formatFridayDate(date: Date): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `Friday, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  },

  getNextFriday(fromDate: Date = new Date()): Date {
    const next = new Date(fromDate);
    const day = next.getDay();
    const diff = (5 - day + 7) % 7 || 7;
    next.setDate(next.getDate() + diff);
    next.setHours(13, 30, 0, 0);
    return next;
  },
};
