![Playwright](https://img.shields.io/badge/Playwright-Test-green)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-blue)
![Salesforce](https://img.shields.io/badge/Salesforce-Automation-blue)



Salesforce QA Automation Framework

Playwright + TypeScript | UI + API + E2E | CI/CD Ready

🚀 Overview

This repository demonstrates a production-grade Salesforce QA Automation framework designed for  enterprise implementations across Sales Cloud, Service Cloud, and integrations.

The framework is built using Playwright with TypeScript and follows API-first, business-driven test automation principles, aligned with Salesforce release cycles, DevOps practices, and quality governance standards.


🎯 Key Objectives

Ensure high-quality, scalable Salesforce implementations

Reduce regression risk during frequent Salesforce releases

Validate business outcomes, not just UI behavior

Support CI/CD-driven continuous quality

Act as a release quality gate, not just a reporting tool

🧱 Architecture & Design Principles
Test Pyramid (Salesforce-Optimized)

        End-to-End Business Flows
        (Few, High-Value Scenarios)
       ───────────────────────────
      API & Integration Tests
     (Fast, Stable, Broad Coverage)
    ───────────────────────────────
     UI Automation (LWC)
    (Critical User Journeys Only)




Core Principles

API-first testing to reduce UI dependency and flakiness

UI automation only where business value exists

Hybrid API + UI flows for end-to-end confidence

Security & data integrity validation across layers

CI/CD-ready execution with clear quality gates

🧪 Test Coverage
Salesforce UI Automation (Playwright), Sales Cloud, Lead creation & conversion, Lightning Web Components (LWC), Salesforce API & Integration Testing

OAuth-based Salesforce authentication

REST API CRUD operations

SOQL-based backend validation

Negative permission scenarios

Integration-style validation patterns

End-to-End Business Flows

Example:

API → Create Lead
        ↓
UI → Convert Lead
        ↓
Salesforce Flow → Auto-create Opportunity
        ↓
API → Validate Opportunity


⚙️ CI/CD & DevOps Integration
Pipeline Strategy, Pull Requests, Smoke tests only, GitHub Actions

Playwright HTML reports with: Screenshots, Videos, Traces


## 📁 Project Structure

- **docs/** — Test strategy & governance
- **src/**
  - **core/** — Framework foundations
  - **auth/** — Salesforce session handling
  - **api/** — Salesforce REST & SOQL layer
  - **ui/** — Page Objects (Salesforce Clouds)
  - **flows/** — Business flow orchestration
  - **security/** — Profile & FLS validation
- **tests/**
  - **smoke/** — Release-entry tests
  - **api/** — API regression
  - **e2e/** — Business-critical flows
  - **security/** — Governance tests
- **.github/workflows/** — CI/CD pipelines



This structure mirrors enterprise Salesforce programs, not toy projects.

🔑 Authentication Strategy

UI-based login once

Persisted session using Playwright storageState

Eliminates repeated logins

Improves stability and execution speed

Enables seamless UI + API hybrid testing



📊 Quality Governance

Tracked and enforced through CI:

Smoke vs Regression separation

Pass/fail trends

Flaky test detection (via retries + traces)

Release confidence indicators



🏆 Who This Is For

Salesforce QA Automation Engineers

Senior SDETs working on Salesforce

QA Technical Consultants

Enterprise Salesforce programs with:

Frequent releases

Complex integrations