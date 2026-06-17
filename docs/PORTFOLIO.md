# Portfolio Story

## Project Summary

This project demonstrates a complete cloud engineering workflow for a containerized Node.js service.

It covers:

* application health and readiness endpoints
* automated tests and coverage
* Docker containerization
* non-root container runtime
* GitLab CI/CD stages
* security scanning
* Azure Container Apps infrastructure
* managed identity and ACR pull permissions
* deployment runbooks
* rollback planning

## What I Built

I started with a small Node.js app and turned it into a cloud deployment lab.

The app now has separate application logic and server startup logic, which allows tests to import the app without starting a long-running process. It exposes `/health` and `/ready` endpoints for container and cloud platform probes.

The CI/CD pipeline validates code, runs tests, collects coverage, builds artifacts, builds Docker images, and includes Azure deployment jobs that are ready for an active subscription.

## Cloud Skills Demonstrated

| Skill | Evidence |
| --- | --- |
| Linux/container fundamentals | Dockerfile, non-root runtime user, health check |
| CI/CD | GitLab stages for lint, test, coverage, build, Docker, deploy |
| Infrastructure as Code | Bicep templates under `infra/` |
| Azure PaaS | Azure Container Apps architecture |
| Identity | System-assigned managed identity and ACR pull role |
| Observability | Log Analytics and Application Insights planned |
| Operations | Runbook, health checks, rollback steps |
| Security | Secret scanning, dependency scanning, SAST, container scanning |

## Interview Talking Points

* Why separate app logic from server startup?
* Why use `/health` and `/ready` separately?
* Why run containers as non-root?
* Why use managed identity instead of registry passwords?
* What does `azd provision` do versus `azd deploy`?
* How would you roll back a bad Container Apps revision?
* How would you reduce cloud cost for a development workload?

## Next Improvements

* Deploy to an active Azure subscription.
* Add screenshots of GitLab pipeline results.
* Add screenshots of Azure Container Apps revisions and logs.
* Add KQL examples for Log Analytics.
* Add cost estimate and cleanup steps.
* Add a custom domain after deployment is stable.
