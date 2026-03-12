# Salesforce QA Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Test-green)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-blue)
![Salesforce](https://img.shields.io/badge/Salesforce-Automation-blue)

Playwright + TypeScript test automation for Salesforce Sales Cloud. The project covers UI smoke checks, API validation, end-to-end business flows, and security scenarios, with GitHub Actions for CI execution.

## What This Project Tests

- Smoke UI: authenticated Lightning home page access
- API: Lead create, query, update, and delete through Salesforce REST APIs
- E2E: Lead creation, UI conversion, and Opportunity validation
- Security:
  - field-level visibility checks for a standard user
  - object permission enforcement for Lead deletion

## Project Structure

```text
.github/workflows/   CI pipeline
docs/                Test strategy and governance notes
src/auth/            Salesforce UI session setup
src/api/             OAuth, REST client, SOQL helpers, API types
src/core/            Environment loading and shared page abstractions
src/flows/           Business flow orchestration
src/security/        Standard-user context helpers
src/ui/              Salesforce page objects
tests/smoke/         Pull request smoke coverage
tests/api/           API regression coverage
tests/e2e/           Business-critical flow coverage
tests/security/      Permission and security checks
```

## Local Setup

1. Install dependencies:

```bash
npm ci
```

2. Create a local env file:

```bash
cp .env.example .env
```

3. Populate `.env` with Salesforce credentials for the org you want to test.

Required admin/API variables:

```env
SF_BASE_URL=https://your-domain.my.salesforce.com
SF_USERNAME=your-admin-username@example.com
SF_PASSWORD=your-admin-password
SF_SECURITY_TOKEN=your-admin-security-token
SF_CLIENT_ID=your-connected-app-client-id
SF_CLIENT_SECRET=your-connected-app-client-secret
```

Required standard-user variables for security tests:

```env
SF_STD_USERNAME=your-standard-username@example.com
SF_STD_PASSWORD=your-standard-password
SF_STD_TOKEN=your-standard-security-token
```

## Running Tests

Run static checks:

```bash
npm run lint
npm run typecheck
```

Run the smoke suite:

```bash
npm run test:smoke
```

Run API, E2E, and security regression:

```bash
npm run test:regression
```

Run everything:

```bash
npm run test:all
```

Generate a local authenticated Playwright storage state:

```bash
npm run auth:sf
```

## Environment Behavior

- If Salesforce UI credentials are missing, global UI login setup is skipped.
- If `SF_BASE_URL` is missing, smoke tests skip instead of failing on invalid relative URLs.
- Security tests only run when the standard-user credentials are configured.
- API and E2E tests require the admin/API credentials and connected app secrets.

## CI Pipeline

GitHub Actions runs:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- Playwright browser install
- PR smoke tests when core Salesforce secrets exist
- push/scheduled API and E2E regression when core Salesforce secrets exist
- push/scheduled security regression only when `SF_STD_*` secrets also exist

Playwright HTML reports are uploaded as workflow artifacts.

## Notes

- Test data is generated uniquely per run to reduce collisions.
- Cleanup is built into API, E2E, and object-permission flows where possible.
- The project assumes the target Salesforce org is configured with the expected Lead and Opportunity business flow and standard-user permissions.
