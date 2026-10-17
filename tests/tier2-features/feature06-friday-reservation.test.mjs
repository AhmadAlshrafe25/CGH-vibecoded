import { describe, test, expect } from '../helpers/test-utils.mjs';
import { DateUtilsOracle, SEATING_SLOTS, PRICING_PER_GUEST_JOD } from '../helpers/contracts.mjs';

describe('Tier 2 - Feature 6: Friday-Only Reservation Engine', () => {
  test('T2-F06-01: Validates strictly Friday dates and rejects all non-Fridays', () => {
    // 2026-10-23 is Friday
    const fridayResult = DateUtilsOracle.validateFridayDate('2026-10-23');
    expect(fridayResult.valid).toBe(true);

    // 2026-10-24 is Saturday -> must fail
    const saturdayResult = DateUtilsOracle.validateFridayDate('2026-10-24');
    expect(saturdayResult.valid).toBe(false);
    expect(saturdayResult.error).toContain('Fridays only');

    // 2026-10-22 is Thursday -> must fail
    const thursdayResult = DateUtilsOracle.validateFridayDate('2026-10-22');
    expect(thursdayResult.valid).toBe(false);
    expect(thursdayResult.error).toContain('Fridays only');
  });

  test('T2-F06-02: Rejects past dates even if they are Fridays', () => {
    const pastFriday = '2026-10-09';
    const result = DateUtilsOracle.validateFridayDate(pastFriday, new Date('2026-10-17T00:00:00Z'));
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Past dates are not available');
  });

  test('T2-F06-03: Generates upcoming consecutive Fridays properly', () => {
    const fridays = DateUtilsOracle.getUpcomingFridays(4, new Date('2026-10-17T00:00:00Z'));
    expect(fridays.length).toBe(4);
    fridays.forEach((d) => {
      expect(d.getDay()).toBe(5);
    });
  });

  test('T2-F06-04: Provides all 3 distinct seating service slots', () => {
    expect(SEATING_SLOTS.length).toBe(3);
    const slotIds = SEATING_SLOTS.map((s) => s.id);
    expect(slotIds).toContain('afternoon');
    expect(slotIds).toContain('sunset');
    expect(slotIds).toContain('starlight');
  });

  test('T2-F06-05: Enforces pricing per guest contract (75 JOD)', () => {
    expect(PRICING_PER_GUEST_JOD).toBe(75);
  });
});
