# CGH Jordanian Private Chef Friday Dining Experience
## 4-Tier E2E Test Suite Infrastructure & Architecture Specification

**Version:** 1.0.0  
**Status:** PUBLISHED & READY  
**Author:** `teamwork_preview_test_writer_e2e_1` (E2E Test Suite Architect & Writer)  
**Target Project:** `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded`  
**Governing Documents:** `ORIGINAL_REQUEST.md`, `PROJECT.md`

---

## 1. Test Architecture Overview

The testing infrastructure for the CGH Prestigious Jordanian Private Chef Friday Dining Experience is designed as an **independent, requirement-driven, 4-tier opaque-box test suite**. Developed concurrently on a dual track with system implementation, the suite is decoupled from internal component refactorings while strictly asserting compliance with the authoritative interface contracts, brand guidelines, and algorithmic restrictions defined in `ORIGINAL_REQUEST.md` and `PROJECT.md`.

```
+---------------------------------------------------------------------------------------------------+
|                                      TEST RUNNER ORCHESTRATION                                    |
|                                       (tests/run-all-tests.mjs)                                    |
+---------------------------------------------------------------------------------------------------+
           |                                |                             |                     |
           v                                v                             v                     v
+-----------------------+      +-----------------------+      +-----------------------+  +-----------------------+
|        TIER 1         |      |        TIER 2         |      |        TIER 3         |  |        TIER 4         |
|   Feature Coverage    |      |  Boundary & Corner    |      |    Cross-Feature      |  |  Real-World Scenarios |
|                       |      |                       |      |     Interactions      |  |                       |
| • 18 Features         |      | • Friday-Only Filter  |      | • Menu + Dietary      |  | • Full Booking Persona|
| • >= 5 tests / feature|      | • Past Dates Blocked  |      | • Filter + Modal Sync |  | • Voucher Verification|
| • 90+ total tests     |      | • Contact Validation  |      | • Validation Recovery |  | • Multi-Device Matrix |
|                       |      | • Party Size Limits   |      | • 15+ total tests     |  | • 15+ total tests     |
|                       |      | • Dietary Empty State |      |                       |  |                       |
|                       |      | • 25+ total tests     |      |                       |  |                       |
+-----------------------+      +-----------------------+      +-----------------------+  +-----------------------+
           |                                |                             |                     |
           +--------------------------------+-----------------------------+---------------------+
                                            |
                                            v
                               +-------------------------+
                               |   Pass / Fail Summary   |
                               |  Exit 0: Complete Pass  |
                               |  Exit 1: Any Failure    |
                               +-------------------------+
```

### Key Architectural Pillars:
1. **Zero-Dependency Native Execution**: Implemented using Node.js 20+ ESM and `node:assert/strict`, ensuring rapid, deterministic execution without heavy browser driver flakiness or transpilation bottlenecks.
2. **Authoritative Expected Output Derivation**: Every test case directly derives its expected output from explicit specifications in `ORIGINAL_REQUEST.md` and `PROJECT.md` § Interface Contracts.
3. **Dual Verification Capability**: Test suites evaluate both behavioral contract oracles (mathematical invariants, validation schemas, data models) and physical codebase artifacts (`tailwind.config.ts`, `globals.css`, component source contracts, SVG placeholders).
4. **Adversarial Resilience**: Incorporates edge cases, invalid phone/email mutations, non-Friday calendar boundary values, and layout viewport checks.

---

## 2. Testing Methodologies

The test suite synthesizes four industry-standard testing methodologies:

### 2.1 Category-Partition Method
Input spaces are decomposed into orthogonal categories and partitioned into discrete equivalence classes:
- **Date Inputs**: Valid upcoming Fridays (Day === 5), non-Friday weekdays (Monday-Thursday), weekends (Saturday, Sunday), past Fridays, malformed ISO strings, leap-year dates.
- **Party Sizes**: Sub-minimum (`0`, `-1`), minimum valid (`1`), mid-range (`2-7`), maximum valid (`8`), buyout trigger threshold (`9`, `12`, `20`), non-numeric inputs.
- **Contact Details**: International Jordanian numbers (`+962 7 9...`, `079...`), international overseas numbers, letters in phone, missing domain in email, missing `@`, valid RFC 5322 emails.
- **Dietary Badges**: `organic`, `vegan`, `vegetarian`, `gluten-free`, `dairy-free`, `nut-free`, combinations, and empty/unfiltered states.

### 2.2 Boundary Value Analysis (BVA)
Applied rigorously to all bounded numerical and temporal constraints:
- **Party Size Boundaries**: $[1, 8]$ $\rightarrow$ Test values: $0$ (Invalid / below min), $1$ (Min valid), $2$ (Nominal lower), $7$ (Nominal upper), $8$ (Max valid), $9$ (Above max / Private buyout modal), $100$ (Extremal invalid).
- **Date Boundaries**:
  - Current Date ($T_0$): If $T_0$ is Friday, same-day cutoff behavior;
  - $T_0 + 1$ through $T_0 + 6$: Strict rejection of non-Fridays;
  - Past dates ($T_0 - 1$, $T_0 - 7$): Strict rejection regardless of day of week;
  - Next 4 upcoming Fridays: Valid selection domain.
- **String Length Boundaries**: Full name empty string (rejected), 1 character (rejected if < 2), 2 characters (accepted), extreme length (100+ chars handled safely).

### 2.3 Pairwise (Combinatorial) Testing
Combinations of parameters that interact across features are tested in pairs to guarantee orthogonal robustness:
- Seating Slot (`afternoon` | `starlight`) $\times$ Party Size ($1, 2, 4, 8$)
- Course Filter (`all` | `starters` | `mains` | `dessert` | `pairings`) $\times$ Dietary Filter (`all` | `vegan` | `gluten-free` | `organic`)
- Active Week Edition (`Week 1: Autumn Olive Harvest` | `Week 2: Jordan Valley Citrus`) $\times$ Reservation Trigger Point (Navbar CTA | Hero CTA | Menu Course Card CTA)

### 2.4 Real-World Scenario Testing
Synthetic personas simulate complete end-to-end guest journeys:
- **Persona A (VIP Couple)**: Explores terroir story, filters menu for Gluten-Free options, reserves Friday evening starlight salon for 2 guests, enters Amman contact number, receives confirmed voucher `#JO-FRI-20261023-XXXX`.
- **Persona B (International Gourmet)**: Switches between seasonal menu editions, reviews wine/beverage pairings, books afternoon terrace slot for party of 6, adds severe nut allergy note, validates pricing calculation in JOD.
- **Persona C (Large Group Request)**: Attempts to reserve party of 10, receives private salon buyout guidance and custom contact prompt.

---

## 3. 4-Tier Test Architecture & Coverage Thresholds

| Tier | Name | Target Scope | Minimum Threshold | Enforced Suite |
|---|---|---|---|---|
| **Tier 1** | **Feature Coverage** | All 18 functional features in `PROJECT.md` | $\ge 5$ test cases per feature (Total $\ge 90$) | `tests/tier1-features/feature01-18.test.mjs` |
| **Tier 2** | **Boundary & Corner Cases** | Non-Friday rejection, past dates, email/phone validation, party sizes 1-8, dietary empty states | $\ge 5$ test cases per boundary (Total $\ge 25$) | `tests/tier2-boundaries/boundary01-05.test.mjs` |
| **Tier 3** | **Cross-Feature Interactions** | Menu toggles, dietary filtering, reservation modal integration, state recovery | Total $\ge 15$ test cases | `tests/tier3-interactions/interaction01-03.test.mjs` |
| **Tier 4** | **Real-World Scenarios** | Complete booking journeys, voucher receipt generation, multi-device layouts | Total $\ge 15$ test cases | `tests/tier4-scenarios/scenario01-03.test.mjs` |

### Detailed Feature Inventory (Tier 1 Mapping):
1. **Feature 1**: Strict Navy (`#0B192C`, `#1B2A4A`) & Cream (`#FDFBF7`, `#F5F0E8`) Palette
2. **Feature 2**: Typography & Editorial Hierarchy (Serif Cormorant Garamond headings + clean modern sans body)
3. **Feature 3**: Styled SVG Nature Placeholders (Zero remote external image URLs, explicit dimensions and botanical labels)
4. **Feature 4**: Responsive Layout Shell (Sticky luxury Navbar, Friday reservation trigger CTA, luxury Footer)
5. **Feature 5**: Environment & Build Scaffolding (Node 20 user-space runtime, Next.js App Router, Tailwind CSS, TypeScript)
6. **Feature 6**: Chef Culinary Narrative (Chef Tariq Al-Amad story, Jordanian native heritage, Levantine hospitality *Karam*)
7. **Feature 7**: Regional Terroir Farm Sourcing (Ajloun olive groves, Jordan Valley organic basin, Jerash terraces, Dead Sea salt)
8. **Feature 8**: Exclusive Friday Cadence Highlight (Single-day operating concept, next service countdown, exclusive atmosphere)
9. **Feature 9**: 4-Course Weekly Menu Showcase (Starters, Mains, Dessert, Beverage Pairings with culinary descriptions)
10. **Feature 10**: Dietary Indicators & Badges (Visual pills for Organic, Vegan, Vegetarian, Gluten-Free on all menu items)
11. **Feature 11**: Dynamic Multi-Week Menu Toggle (Structured schema allowing switching between rotating weekly editions)
12. **Feature 12**: Course & Dietary Filter Tabs (Interactive client tabs for filtering dishes by course or dietary requirement)
13. **Feature 13**: Interactive Reservation Modal (Modal dialog with backdrop blur, keyboard ESC dismissal, accessible focus)
14. **Feature 14**: Strict Friday-Only Date Picker (Algorithmically locking dates to `date.getDay() === 5`, blocking non-Fridays)
15. **Feature 15**: Seating Time Slot Selector (Afternoon Terrace 1:30 PM vs Evening Starlight Salon 7:30 PM)
16. **Feature 16**: Guest Count Stepper (Party size 1-8 guests, private buyout prompt for 9+)
17. **Feature 17**: Real-Time Form Validation (Immediate inline validation feedback for name, email, phone, date, slot)
18. **Feature 18**: Simulated Confirmation Receipt (Luxury voucher with reference `#JO-FRI-XXXX`, JOD price total, arrival instructions)

---

## 4. Test Execution & Runner Command

### Primary Execution Command
```bash
node tests/run-all-tests.mjs
```

### Alternative Execution (via package.json script)
```bash
npm run test:e2e
```

### Execution Options
- **Filter by Tier**:
  ```bash
  node tests/run-all-tests.mjs --tier=1
  node tests/run-all-tests.mjs --tier=2
  node tests/run-all-tests.mjs --tier=3
  node tests/run-all-tests.mjs --tier=4
  ```
- **Verbose Output**:
  ```bash
  node tests/run-all-tests.mjs --verbose
  ```

---

## 5. Pass/Fail Semantics & Exit Codes

The test runner operates under deterministic exit code semantics:

- **Exit Code 0 (SUCCESS)**:
  - Every test case in all executed tiers passed without assertion failure.
  - No unhandled Promise rejections or uncaught exceptions occurred.
  - All coverage thresholds met:
    - Tier 1: 18 features $\times$ $\ge 5$ tests $= \ge 90$ passed
    - Tier 2: 5 boundaries $\times$ $\ge 5$ tests $= \ge 25$ passed
    - Tier 3: Interactions $\ge 15$ passed
    - Tier 4: Scenarios $\ge 15$ passed
    - Overall Total: $\ge 145$ passed
- **Exit Code 1 (FAILURE)**:
  - One or more test cases threw an `AssertionError`.
  - A required interface contract or schema invariant was violated.
  - A required threshold was not satisfied.
  - Detailed diagnostic output is printed identifying the failing file, line number, expected vs actual values, and stack trace.

---

## 6. Authoritative Requirement Derivation Table

| Requirement | Source Clause | Authoritative Test Suite | Expected Observable Output |
|---|---|---|---|
| Palette Tokens | `ORIGINAL_REQUEST.md §R1` | `tier1-features/feature01-brand-palette.test.mjs` | Backgrounds use `#0B192C`/`#1B2A4A`, accents `#FDFBF7`/`#F5F0E8` |
| Zero External Images | `ORIGINAL_REQUEST.md §R1, §41` | `tier1-features/feature03-svg-placeholders.test.mjs` | No `http://`, `https://`, or unsplash image domains; explicit dimension labels |
| Friday Cadence | `ORIGINAL_REQUEST.md §R2, §18` | `tier1-features/feature08-friday-cadence.test.mjs` | Operating schedule explicitly restricted to one day per week on Fridays |
| 4-Course Menu | `PROJECT.md §59, §113` | `tier1-features/feature09-weekly-menu.test.mjs` | Structured courses: starters, mains, dessert, pairings with ingredients |
| Friday Date Calculation | `PROJECT.md §181, §R3` | `tier2-boundaries/boundary01-non-friday-dates.test.mjs` | `isFriday(date) === (date.getDay() === 5)`; non-Fridays return `valid: false` |
| Past Date Rejection | `PROJECT.md §64` | `tier2-boundaries/boundary02-past-dates.test.mjs` | Dates before active service Friday rejected with specific error message |
| Guest Stepper Limits | `PROJECT.md §66` | `tier2-boundaries/boundary04-party-sizes.test.mjs` | Valid 1-8; 0 and negatives rejected; 9+ flags buyout alert |
| Voucher Receipt | `PROJECT.md §169` | `tier4-scenarios/scenario02-simulated-voucher-receipt.test.mjs` | Reference format `#JO-FRI-\d{8}-\w+`, JOD pricing $= \text{guests} \times \text{rate}$ |

---
*Published by E2E Test Suite Architect & Writer on 2026-10-17.*
