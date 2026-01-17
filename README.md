# CI/CD Test Project (GitLab)

[![pipeline status](../../badges/main/pipeline.svg)](../../pipelines)
[![coverage report](../../badges/main/coverage.svg)](../../pipelines)

Small demo project to showcase a GitLab CI pipeline:
- Lint
- Unit tests + JUnit report
- Build artifact (dist/)
- Docker image build (and push to GitLab Container Registry)

## Local dev
```bash
npm ci
npm run lint
npm test
npm run build
