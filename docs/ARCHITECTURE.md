# Architecture

This project is a small containerized Node.js service deployed with Azure Developer CLI and Bicep.

## Runtime

```text
User
  |
  v
Azure Container Apps ingress
  |
  v
Node.js container on port 3000
  |
  |-- GET /       application status
  |-- GET /health liveness/startup probe
  `-- GET /ready  readiness probe
```

## Azure Resources

| Resource | Purpose |
| --- | --- |
| Resource group | Groups all lab resources for lifecycle management |
| Azure Container Registry | Stores the built container image |
| Container Apps Environment | Managed hosting boundary for Container Apps |
| Container App | Runs the Node.js container |
| Log Analytics Workspace | Stores platform and container logs |
| Application Insights | Application monitoring target |
| Managed Identity | Allows the Container App to pull from ACR without registry passwords |

## Deployment Flow

```text
Git push
  |
  v
GitLab CI
  |
  |-- lint
  |-- test
  |-- coverage
  |-- build artifact
  |-- Docker image build
  |-- security scans
  `-- manual Azure deploy
        |
        v
      azd provision
        |
        v
      azd deploy
```

## Security Notes

* The container runs as a non-root user.
* ACR admin user is disabled.
* Container App uses a system-assigned managed identity.
* The ACR pull permission is scoped to the registry.
* No application secrets are required for the current app.
* Production secrets should be stored in GitLab protected CI/CD variables or Azure Key Vault.

## Scaling

The Container App is configured for a cost-optimized lab profile:

| Setting | Value |
| --- | --- |
| Minimum replicas | 0 |
| Maximum replicas | 3 |
| HTTP concurrent requests | 50 |

For production, consider setting minimum replicas to `1` to avoid cold starts.
