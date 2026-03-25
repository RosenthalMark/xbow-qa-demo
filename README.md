# Xbow QA Strategy Demo - OWASP Juice Shop

## 1. Automated Security & API Strategy
This repository uses Playwright as a single execution layer for UI, API, and security-focused validation against OWASP Juice Shop. The objective is to keep test orchestration consistent while exercising the highest-risk user paths where SQL injection and XSS payload handling are likely to regress under feature churn. By driving realistic browser behavior and network assertions in the same runtime, the suite reduces blind spots between frontend validation, backend response contracts, and client-side sanitization behavior.

From a scaling perspective, centralizing these checks in Playwright lets the team expand attack-pattern coverage without fragmenting tooling or increasing operational load in CI. From a risk perspective, automated SQLi and XSS mocking shifts these defects from production discovery into deterministic pre-merge signals.

## 2. GhostOps CI/CD
GhostOps CI/CD implements a "Shift Left" control point on every push to `main` through GitHub Actions. The workflow provisions dependencies, installs Playwright browsers with required system packages, and executes the core suite as a release gate.

This pipeline design focuses on containment of security and integration risk before downstream environments absorb unstable changes. Standardized, repeatable execution in CI also improves confidence at scale by reducing local-environment variance and preserving artifact-quality diagnostics for triage when failures occur.

## 3. Flaky Test Handling (Pipeline Credibility)
If a test fails intermittently in CI but keeps passing locally, the first step is to confirm it is truly flaky by rerunning it. Once the pattern is real, the test is quarantined so the main pipeline remains trustworthy for release decisions.

Quarantine is not silence. The test still runs in a separate non-blocking lane, the owning team is notified, and manual verification is added for that risk area until the fix is merged.
In this repository, quarantined tests are identified with `@quarantine` and executed in a dedicated CI job.

## 4. Scaling Across Pods (Product + Engineering)
Automation is treated as a product capability, not a last-mile QA task. Coverage expectations are aligned with engineering and product management when features are planned, so quality work is scoped early and not bolted on at the end.

This model scales across pods by making quality ownership shared: engineers implement coverage, product managers prioritize it as delivery risk reduction, and QA provides visibility into defect prevention, cycle-time impact, and cost avoidance.

## 5. Setup
```bash
docker run -d --name juice-shop -p 3000:3000 bkimminich/juice-shop
cd playwright
npm install
npm test
docker rm -f juice-shop
```
