# CI/CD Cloud Engineering Lab

This project is a small Node.js application used to practice cloud engineering, DevOps, containerization, and GitLab CI/CD workflows.

It starts as a simple HTTP service, then grows into a portfolio-ready cloud deployment lab with automated tests, build artifacts, Docker images, security scanning, infrastructure-as-code, deployment environments, monitoring, and operational runbooks.

---

# Features

* Node.js HTTP service with `/` and `/health` endpoints
* Importable application logic separated from server startup
* Node.js syntax validation checks
* Automated unit and HTTP behavior tests
* JUnit test report artifacts
* Test coverage reporting
* Build artifact generation in `dist/`
* Docker containerization
* Non-root container runtime user
* GitLab Container Registry image pushes
* GitLab merge request pipeline support
* Dependency caching for faster pipelines
* Interruptible pipelines for optimization
* GitLab SAST security scanning
* GitLab dependency vulnerability scanning
* GitLab secret detection
* GitLab container scanning
* Placeholder staging and production deployment jobs

---

# Project Structure

```text
.
|-- scripts/
|   `-- build.js
|-- src/
|   |-- app.js
|   `-- index.js
|-- test/
|   |-- add.test.js
|   `-- http.test.js
|-- .dockerignore
|-- .gitignore
|-- .gitlab-ci.yml
|-- Dockerfile
|-- package.json
|-- package-lock.json
`-- README.md
```

`src/app.js` contains reusable application logic and the HTTP request handler.

`src/index.js` is the process entrypoint that starts the server.

This split keeps tests fast and predictable because importing application logic no longer starts a long-running server.

---

# Local Development

Install dependencies:

```bash
npm ci
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run coverage:

```bash
npm run coverage
```

Run the build script:

```bash
npm run build
```

Run the app locally:

```bash
node src/index.js
```

Then open:

```text
http://localhost:3000/
http://localhost:3000/health
```

---

# Docker

Build the container image:

```bash
docker build -t ci-cd-cloud-lab .
```

Run the container:

```bash
docker run --rm -p 3000:3000 ci-cd-cloud-lab
```

Check the health endpoint:

```bash
curl http://localhost:3000/health
```

The Dockerfile uses:

* Node.js 20 Alpine
* production dependency installation
* a non-root application user
* a container health check against `/health`
* port `3000`

---

# CI/CD Pipeline

Pipelines run on:

* `main`
* merge requests
* tags/releases

Pipeline stages:

| Stage | Purpose |
| --- | --- |
| lint | Validate source syntax |
| test | Run automated tests and publish JUnit results |
| coverage | Generate coverage reports |
| build | Generate `dist/` artifacts and a release bundle |
| docker | Build and push the container image |
| deploy | Deploy to staging or production |

Current deploy jobs are placeholders. The next major milestone is replacing those echo commands with a real cloud target.

---

# Cloud Engineer Roadmap

Use this repository as a hands-on path into cloud engineering. Each milestone turns one professional cloud skill into working code.

## Milestone 1: Application Readiness

* Keep app logic separate from process startup
* Add automated tests for every public endpoint
* Add environment-based configuration
* Keep `/health` stable for container and cloud health probes
* Produce build artifacts in CI

## Milestone 2: Containers

* Build the Docker image locally
* Run the app locally from the image
* Push images to GitLab Container Registry
* Tag images for `main`, merge requests, and releases
* Scan container images for vulnerabilities

## Milestone 3: Cloud Deployment

Choose one deployment target:

* Azure Container Apps
* Azure App Service for Containers
* AWS ECS Fargate
* Google Cloud Run
* Kubernetes with AKS, EKS, or GKE

Then add:

* staging deployment from `main`
* manual production deployment from tags
* environment URLs in GitLab
* rollback notes
* deployment variables and secrets

## Milestone 4: Infrastructure as Code

Add Terraform or Bicep to create the cloud platform:

* resource group or project
* container registry access
* container app or service
* identity and permissions
* log workspace
* network rules where needed
* outputs for deployed URLs

## Milestone 5: Operations

Make the app observable and supportable:

* collect logs
* collect metrics
* configure alerts
* document common failures
* document rollback steps
* track expected monthly cost
* add an architecture diagram

---

# Suggested First Cloud Target

Azure Container Apps is a strong first target because it teaches the important cloud concepts without forcing you to manage Kubernetes immediately:

* containerized app deployment
* managed HTTPS ingress
* environment variables
* managed identities
* revision history and rollback
* logs and metrics
* scaling rules

After that, moving the same app to Kubernetes is a natural next step.

---

# Azure Deployment

This repository is prepared for Azure Developer CLI deployment to Azure Container Apps.

Planned Azure resources:

* Azure Container Apps
* Azure Container Apps Environment
* Azure Container Registry
* Log Analytics Workspace
* Application Insights
* System-assigned managed identity

Deployment configuration files:

```text
azure.yaml
infra/main.bicep
infra/main.parameters.json
infra/modules/container-app.bicep
.azure/deployment-plan.md
```

Before provisioning, refresh Azure CLI authentication if needed:

```bash
az login
```

Create or select an Azure Developer CLI environment:

```bash
azd env new dev
azd env set AZURE_SUBSCRIPTION_ID <subscription-id>
azd env set AZURE_LOCATION eastus
```

Then validate and deploy through the Azure workflow:

```bash
azd provision
azd deploy
```

After deployment, verify:

```text
https://<container-app-url>/
https://<container-app-url>/health
https://<container-app-url>/ready
```

---

# Build Output

The build stage generates:

```text
dist/build.txt
```

The GitLab pipeline saves this as a downloadable artifact.

---

# Example Pipeline Flow

```text
Developer Push
      |
      v
GitLab Pipeline Triggered
      |
      v
Lint
      |
      v
Test + Coverage
      |
      v
Build Artifact
      |
      v
Docker Image Build
      |
      v
Push Image to Registry
      |
      v
Deploy to Cloud Environment
```

---

# Next Work Items

* Add real cloud deployment commands to `.gitlab-ci.yml`
* Add Terraform or Bicep infrastructure
* Add cloud-specific secrets and variables documentation
* Add monitoring and alerting
* Add a rollback runbook
* Add an architecture diagram
