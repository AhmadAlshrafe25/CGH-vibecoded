// tests/helpers/test-utils.mjs
// Lightweight, zero-dependency Node.js ESM test framework with assertion library and reporting

import assert from 'node:assert/strict';

export class TestRunnerContext {
  constructor() {
    this.currentSuite = 'Global';
    this.results = [];
    this.suites = new Map();
  }

  describe(name, fn) {
    const prevSuite = this.currentSuite;
    this.currentSuite = name;
    if (!this.suites.has(name)) {
      this.suites.set(name, []);
    }
    try {
      fn();
    } finally {
      this.currentSuite = prevSuite;
    }
  }

  async test(name, fn) {
    const suiteName = this.currentSuite;
    const startTime = performance.now();
    try {
      await fn();
      const durationMs = (performance.now() - startTime).toFixed(2);
      const record = { suite: suiteName, name, passed: true, durationMs };
      this.results.push(record);
      if (this.suites.has(suiteName)) {
        this.suites.get(suiteName).push(record);
      }
      return record;
    } catch (err) {
      const durationMs = (performance.now() - startTime).toFixed(2);
      const record = {
        suite: suiteName,
        name,
        passed: false,
        durationMs,
        error: err.message || String(err),
        stack: err.stack,
      };
      this.results.push(record);
      if (this.suites.has(suiteName)) {
        this.suites.get(suiteName).push(record);
      }
      return record;
    }
  }

  getSummary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    return { total, passed, failed, results: this.results };
  }

  clear() {
    this.results = [];
    this.suites.clear();
    this.currentSuite = 'Global';
  }
}

// Global shared context instance
export const runner = new TestRunnerContext();

export function describe(name, fn) {
  return runner.describe(name, fn);
}

export function it(name, fn) {
  return runner.test(name, fn);
}

export function test(name, fn) {
  return runner.test(name, fn);
}

// Assertion Helpers (Chai/Jest-like expect)
export function expect(actual) {
  return {
    toBe(expected) {
      assert.strictEqual(actual, expected, `Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
    },
    toEqual(expected) {
      assert.deepStrictEqual(actual, expected, `Expected ${JSON.stringify(actual)} to deep-equal ${JSON.stringify(expected)}`);
    },
    toMatch(regex) {
      assert.ok(
        regex.test(String(actual)),
        `Expected "${actual}" to match pattern ${regex}`
      );
    },
    toContain(expectedItem) {
      if (typeof actual === 'string') {
        assert.ok(
          actual.includes(expectedItem),
          `Expected string "${actual}" to contain substring "${expectedItem}"`
        );
      } else if (Array.isArray(actual)) {
        assert.ok(
          actual.includes(expectedItem),
          `Expected array ${JSON.stringify(actual)} to contain item ${JSON.stringify(expectedItem)}`
        );
      } else if (actual && typeof actual === 'object') {
        assert.ok(
          expectedItem in actual,
          `Expected object to contain key "${expectedItem}"`
        );
      } else {
        throw new Error(`Cannot perform toContain on actual type: ${typeof actual}`);
      }
    },
    toBeGreaterThan(num) {
      assert.ok(
        actual > num,
        `Expected ${actual} to be greater than ${num}`
      );
    },
    toBeGreaterThanOrEqual(num) {
      assert.ok(
        actual >= num,
        `Expected ${actual} to be greater than or equal to ${num}`
      );
    },
    toBeLessThan(num) {
      assert.ok(
        actual < num,
        `Expected ${actual} to be less than ${num}`
      );
    },
    toBeLessThanOrEqual(num) {
      assert.ok(
        actual <= num,
        `Expected ${actual} to be less than or equal to ${num}`
      );
    },
    toBeDefined() {
      assert.ok(actual !== undefined, `Expected value to be defined, but was undefined`);
    },
    toBeUndefined() {
      assert.strictEqual(actual, undefined, `Expected value to be undefined, but was ${actual}`);
    },
    toBeNull() {
      assert.strictEqual(actual, null, `Expected value to be null, but was ${actual}`);
    },
    toBeTruthy() {
      assert.ok(Boolean(actual), `Expected truthy value, but received ${actual}`);
    },
    toBeFalsy() {
      assert.ok(!actual, `Expected falsy value, but received ${actual}`);
    },
    toHaveLength(expectedLen) {
      assert.strictEqual(
        actual?.length,
        expectedLen,
        `Expected length ${expectedLen}, but received ${actual?.length}`
      );
    },
    toThrow(expectedMessageSubstr) {
      if (typeof actual !== 'function') {
        throw new Error(`Expected a function in expect(), received ${typeof actual}`);
      }
      let threw = false;
      let caughtErr = null;
      try {
        actual();
      } catch (err) {
        threw = true;
        caughtErr = err;
      }
      assert.ok(threw, `Expected function to throw an error, but it did not throw`);
      if (expectedMessageSubstr && caughtErr) {
        assert.ok(
          caughtErr.message.includes(expectedMessageSubstr),
          `Expected error message "${caughtErr.message}" to contain "${expectedMessageSubstr}"`
        );
      }
    },
  };
}
