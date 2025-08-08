# Rest API Tests with Playwright

This project demonstrates automated testing of REST APIs and web applications using [Playwright](https://playwright.dev/). It includes API client utilities, JSON schema validation, and example UI tests for a TodoMVC demo app.

## Project Structure

├── config/ # Environment configuration files ├── playwright-report/ # Playwright HTML test reports ├── schemas/ # JSON schema definitions for validation ├── test-results/ # Playwright test result artifacts ├── tests/ # Main API and schema validation test suites ├── tests-examples/ # Example UI and demo tests (e.g., TodoMVC) ├── utils/ # API client and schema validation utilities ├── .gitignore ├── package.json ├── playwright.config.js └── ReadMe.md

## Key Features

- **API Testing:**  
  Uses a reusable [`ApiClient`](utils/apiClient.ts) class for CRUD operations and custom queries.
- **Schema Validation:**  
  Supports validation using AJV and Zod with schemas in [`schemas/`](schemas/).
- **UI Testing:**  
  Example Playwright UI tests for the [TodoMVC demo app](https://demo.playwright.dev/todomvc) in [`tests-examples/demo-todo-app.spec.js`](tests-examples/demo-todo-app.spec.js).
- **Reporting:**  
  Generates HTML reports in [`playwright-report/`](playwright-report/).

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. Run all tests:
   npx playwright test
3. View HTML report:
   npx playwright show-report

Test Suites
API Tests:
Located in tests/apiClient.spec.ts, covering CRUD, error handling, and edge cases for item APIs.

Schema Validation Tests:

tests/jsonSchemaValidatorUsingAjv.spec.ts
tests/jsonSchemaValidatorUsingZod.spec.ts
UI Example Tests:

tests-examples/demo-todo-app.spec.js: End-to-end tests for the TodoMVC app.
tests-examples/example.spec.js: Playwright demo tests.
Utilities
API Client:
utils/apiClient.ts provides a class for making HTTP requests and custom queries.
Schema Validator:
utils/schemaValidator.ts for validating API responses against JSON schemas.
Configuration
Playwright Config:
playwright.config.js contains browser/project settings and test options.
Environment Variables:
Place environment-specific variables in config/.env.
License
MIT
