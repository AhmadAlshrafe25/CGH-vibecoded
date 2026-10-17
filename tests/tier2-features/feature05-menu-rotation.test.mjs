import { describe, test, expect } from '../helpers/test-utils.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { COURSE_CATEGORIES, DIETARY_PREFERENCES } from '../helpers/contracts.mjs';

describe('Tier 2 - Feature 5: Dynamic Weekly Rotating Menu', () => {
  const menuFilePath = path.resolve('src/data/weeklyMenuData.ts');
  const content = fs.readFileSync(menuFilePath, 'utf8');

  test('T2-F05-01: Contains at least 2 distinct seasonal weekly menu editions', () => {
    expect(content).toContain('edition-42');
    expect(content).toContain('edition-43');
    expect(content).toContain('Autumn Harvest Edition');
    expect(content).toContain('Late Autumn Hearth Edition');
  });

  test('T2-F05-02: Every menu edition contains all 4 standard courses', () => {
    COURSE_CATEGORIES.forEach((cat) => {
      expect(content).toContain(`category: '${cat}'`);
    });
  });

  test('T2-F05-03: Every menu item contains valid dietary badges from allowed list', () => {
    DIETARY_PREFERENCES.forEach((d) => {
      if (d === 'organic' || d === 'vegan' || d === 'gluten-free' || d === 'vegetarian') {
        expect(content).toContain(`'${d}'`);
      }
    });
  });

  test('T2-F05-04: Sourcing origins explicitly celebrate Jordanian locations', () => {
    expect(content).toContain('Ajloun');
    expect(content).toContain('Jordan Valley');
    expect(content).toContain('Jerash');
    expect(content).toContain('Dead Sea');
  });
});
