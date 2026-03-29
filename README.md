# Security Testing Demo for OWASP Juice Shop

Playwright-based QA and security testing suite that exercises OWASP Juice Shop across UI flows, API contracts, and common web attack patterns.  
The goal is to show how functional and security validation can run in one pipeline with fast feedback and repeatable results.

## What This Demonstrates
- Unified automation strategy: one framework (`Playwright`) for browser, API, and security-oriented checks.
- Shift-left security: run injection and exposure checks before release instead of discovering them in production.
- Pipeline credibility: flaky coverage can be isolated with `@quarantine` while still being tracked in CI.
- Practical test modeling: document both protected behaviors and intentionally vulnerable behaviors in a training target.

## Coverage Areas
- UI smoke checks: core pages, navigation, search, and auth screens.
- API checks: response codes, schema sanity, authentication behavior, and key endpoint reachability.
- Security checks: SQL injection behavior on login inputs.
- Security checks: XSS handling in search.
- Security checks: access control verification on admin and basket routes.
- Security checks: error response hygiene (stack trace exposure).
- Security checks: basic header and traversal checks.

## Project Layout
```text
.github/workflows/playwright.yml   # CI pipeline + quarantine lane
playwright/
  playwright.config.ts             # Base URL + Playwright runtime config
  tests/
    ui.smoke.spec.ts               # UI smoke suite
    api.spec.ts                    # API validation suite
    security.spec.ts               # Security-oriented checks
```

## Quick Start
Prerequisites:
- Node.js 20+
- Docker running locally

Start target app:
```bash
docker run -d --name juice-shop -p 3000:3000 bkimminich/juice-shop
```

Install and run tests:
```bash
cd playwright
npm ci
npx playwright install
npm test
```

Stop target app:
```bash
docker rm -f juice-shop
```

## Useful Commands
```bash
npm test                 # full suite
npm run test:smoke       # UI smoke tests
npm run test:api         # API tests
npm run test:security    # security-focused tests
npm run test:ui          # Playwright UI runner
npm run test:report      # open HTML report
```

## CI/CD Notes
GitHub Actions runs on pushes to `main` and includes:
- Environment bootstrap (`npm ci`, browser install, Juice Shop container startup).
- Main gating lane that excludes quarantined tests.
- Non-blocking quarantine lane for `@quarantine` tests.

This keeps release signals stable while preserving visibility into unstable or in-progress coverage.

## Why This Matters
Security regressions and integration defects often cross UI and API boundaries.  
Keeping these checks in one automation surface reduces tool sprawl, improves triage, and makes security testing part of everyday delivery instead of a late-stage audit.
