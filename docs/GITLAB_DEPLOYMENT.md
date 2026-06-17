# GitLab Azure Deployment Setup

The pipeline includes Azure-ready manual jobs:

| Job | Purpose |
| --- | --- |
| `azure-validate` | Runs `azd provision --preview` and `azd package` |
| `deploy-staging` | Provisions and deploys from `main` |
| `deploy-production` | Provisions and deploys from a Git tag |

These jobs are manual so the project remains safe while the Azure subscription is expired or unavailable.

## Required GitLab CI/CD Variables

Create these in **Settings > CI/CD > Variables**.

| Variable | Protected | Masked | Purpose |
| --- | --- | --- | --- |
| `AZURE_CLIENT_ID` | Yes | Yes | Service principal app/client ID |
| `AZURE_CLIENT_SECRET` | Yes | Yes | Service principal secret |
| `AZURE_TENANT_ID` | Yes | Yes | Microsoft Entra tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Yes | No | Target Azure subscription |
| `AZURE_LOCATION` | No | No | Azure region, defaults to `eastus` |
| `AZD_ENV_NAME` | No | No | AZD environment, defaults to `dev` |

## Service Principal

Create a service principal when an active subscription is available:

```bash
az ad sp create-for-rbac \
  --name ci-cd-cloud-lab-gitlab \
  --role Contributor \
  --scopes /subscriptions/<subscription-id> \
  --sdk-auth
```

For tighter security, scope the role to a resource group after the resource group exists.

The deploy job also creates an ACR pull role assignment for the Container App managed identity. The GitLab identity must have permission to create role assignments. If `Contributor` is not enough, use `User Access Administrator` at the narrowest practical scope during setup.

## Pipeline Promotion Flow

```text
Merge request
  |
  v
lint, test, coverage, build, docker-build
  |
  v
manual azure-validate

main branch
  |
  v
manual deploy-staging

version tag
  |
  v
manual deploy-production
```

## Current Azure Blocker

The original Azure for Students subscription returned:

```text
ReadOnlyDisabledSubscription
```

Until an active subscription is available, use the pipeline to demonstrate CI, Docker, security scanning, deployment planning, and manual deploy readiness.
