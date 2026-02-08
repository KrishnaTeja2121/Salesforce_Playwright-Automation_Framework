## Salesforce QA Automation Strategy

### Scope
- Salesforce Sales Cloud (UI + API)
- Core business flows
- Regression & smoke coverage

### Test Pyramid
- API tests: 60%
- UI tests: 30%
- E2E flows: 10%

### Risks
- Lightning UI flakiness
- Async flows
- Role-based access

### Mitigation
- API-first validation
- Stable selectors
- Retry + trace strategy

## Authentication Strategy

Salesforce authentication is handled using a one-time UI login that
persists the browser session using Playwright storageState.

- Improves test stability
- Reduces execution time
- Enables UI + API hybrid testing
- CI-ready design

Run once:
npm run auth:sf

### API Automation
- REST API testing using Salesforce OAuth
- SOQL-based backend validation
- API-first approach to reduce UI dependency
- Supports integration and middleware testing

### End-to-End Testing
- Limited high-value business flows
- API + UI hybrid execution
- Backend validation using SOQL
- Focus on business confidence, not UI coverage


### Security & Permissions Testing
- Profile and permission-based validation
- Field-level security checks
- Negative API tests for unauthorized access
- Supports compliance and audit readiness


## CI/CD & Quality Governance

- GitHub Actions based pipeline
- Smoke tests on pull requests
- Nightly regression execution
- HTML reports with screenshots & traces
- Automation acts as a release quality gate

This framework supports Salesforce release cycles
and promotes shift-left testing practices.
