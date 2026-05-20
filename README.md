# CI/CD Test Project for GitLab

This project is a small Node.js demo application created to showcase a modern GitLab CI/CD pipeline using Docker and automated DevOps workflows.

The pipeline demonstrates continuous integration practices such as linting, automated testing, build artifact generation, security scanning, and Docker image creation with GitLab Container Registry integration.

---

# Features

* GitLab CI/CD pipeline automation
* Node.js syntax validation checks
* Automated unit testing
* JUnit test report artifacts
* Test coverage reporting
* Build artifact generation (`dist/`)
* Docker containerization
* GitLab Container Registry image pushes
* Dependency caching for faster pipelines
* Interruptible pipelines for optimization
* GitLab SAST security scanning
* GitLab dependency vulnerability scanning
* Merge request pipeline support

---

# Project Structure

```text
.
├── scripts/
│   └── build.js
├── src/
│   └── index.js
├── test/
│   └── add.test.js
├── .dockerignore
├── .gitignore
├── .gitlab-ci.yml
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```
Pipelines run on:
- main
- merge requests
- tags/releases
---

# CI/CD Pipeline Stages

The GitLab pipeline is divided into four stages:

| Stage  | Purpose                              |
| ------ | ------------------------------------ |
| lint   | Runs Node.js syntax validation                 |
| test   | Executes unit tests and coverage     |
| build  | Generates build artifacts in `dist/` |
| docker | Builds and pushes Docker images      |

---

# Security Features

This project includes GitLab security templates for:

* Static Application Security Testing (SAST)
* Dependency vulnerability scanning

These scans help identify:

* insecure code patterns
* vulnerable npm packages
* potential security risks

---

# Docker

The application is containerized using Docker with:

* lightweight Alpine Node.js images
* production dependency installs
* non-root container user
* `.dockerignore` optimization

Docker images are automatically built and pushed to the GitLab Container Registry during CI/CD execution.

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

Run build script:

```bash
npm run build
```

Run application locally:

```bash
node src/index.js
```

---

# Build Output

The build stage generates:

```text
dist/build.txt
```

This file is saved as a GitLab pipeline artifact for 7 days.

---

# Example Pipeline Flow

```text
Developer Push
      ↓
GitLab Pipeline Triggered
      ↓
Lint Stage
      ↓
Test + Coverage Stage
      ↓
Build Artifact Stage
      ↓
Docker Image Build
      ↓
Push Image to GitLab Registry
```

---

# Technologies Used

* Node.js 20
* Docker
* GitLab CI/CD
* ESLint
* Node.js built-in test runner
* GitLab Security Scanning

---

# Future Improvements

Potential future enhancements include:

* Kubernetes deployment
* Terraform infrastructure provisioning
* GitLab environments
* automated deployments
* semantic version tagging
* healthcheck endpoints
* monitoring and observability integration

---

