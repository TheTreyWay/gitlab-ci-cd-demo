# Azure Deployment Plan

> **Status:** Ready for Validation

Generated: 2026-06-16

---

## 1. Project Overview

**Goal:** Deploy the existing containerized Node.js CI/CD cloud engineering lab to Azure Container Apps and make it a repeatable cloud-engineering portfolio project.

**Path:** Modernize Existing

This is an existing non-Azure application with Docker and GitLab CI/CD already in place. The goal is to add Azure deployment support, not replace the app.

---

## 2. Requirements

| Attribute | Value |
|-----------|-------|
| Classification | Development / Portfolio lab |
| Scale | Small |
| Budget | Cost-Optimized |
| Subscription | Azure for Students (`4bbe0306-d437-4cac-afbb-7de2f3964498`) |
| Location | Proposed: `eastus` |
| Compliance | No regulated data; public demo app only |

**Azure CLI note:** `az account show` succeeded, but token-backed commands failed with a Windows credential decryption error. Before validation/deployment, run `az login` to refresh the Azure CLI token cache.

---

## 3. Components Detected

| Component | Type | Technology | Path |
|-----------|------|------------|------|
| web | HTTP API / web service | Node.js 20, built-in `http` module | `src/` |
| container | Container image | Docker, Node 20 Alpine | `Dockerfile` |
| ci | CI/CD pipeline | GitLab CI/CD | `.gitlab-ci.yml` |

## 4. Existing Infrastructure

| Item | Status |
|------|--------|
| `azure.yaml` | Not found |
| `infra/` | Not found |
| Dockerfile | Found |
| GitLab CI/CD | Found |
| Specialized SDKs | None detected |

---

## 5. Recipe Selection

**Selected:** AZD with Bicep

**Rationale:**

* This is a single Azure-first containerized app.
* AZD gives a simple developer workflow for provisioning and deployment.
* Bicep is a strong fit for learning Azure-native infrastructure.
* The existing Dockerfile can be reused.
* The deployment can later be wired into GitLab CI/CD after local Azure deployment is proven.

---

## 6. Architecture

**Stack:** Containers

### Service Mapping

| Component | Azure Service | SKU / Configuration |
|-----------|---------------|---------------------|
| web | Azure Container Apps | External ingress, target port `3000`, min replicas `0` or `1`, max replicas `3` |
| image registry | Azure Container Registry | Basic SKU |
| logs | Log Analytics Workspace | Consumption-based |
| monitoring | Application Insights | Workspace-based |
| identity | Managed Identity | System-assigned identity for Container App |

### Runtime Configuration

| Setting | Value |
|---------|-------|
| Container port | `3000` |
| Health endpoint | `/health` |
| Startup command | `node src/index.js` |
| Image source | Built from local Dockerfile and pushed to Azure Container Registry by AZD |

### Supporting Services

| Service | Purpose |
|---------|---------|
| Azure Container Registry | Stores the built container image |
| Container Apps Environment | Hosts the app and provides ingress/runtime platform |
| Log Analytics Workspace | Centralized container logs |
| Application Insights | Monitoring and application telemetry target |
| Managed Identity | Registry pull identity and future Azure service access |

---

## 7. Provisioning Limit Checklist

**Purpose:** Validate that the selected subscription and region have sufficient quota/capacity for all resources to be deployed.

### Resource Inventory

| Resource Type | Number to Deploy | Total After Deployment | Limit/Quota | Notes |
|---------------|------------------|------------------------|-------------|-------|
| `Microsoft.Resources/resourceGroups` | 1 | Requires Azure CLI re-auth | Requires Azure CLI re-auth | Low-risk standard resource |
| `Microsoft.ContainerRegistry/registries` | 1 | Requires Azure CLI re-auth | Requires Azure CLI re-auth | Basic SKU planned |
| `Microsoft.App/managedEnvironments` | 1 | Requires Azure CLI re-auth | Requires Azure CLI re-auth | Container Apps environment |
| `Microsoft.App/containerApps` | 1 | Requires Azure CLI re-auth | Requires Azure CLI re-auth | One app |
| `Microsoft.OperationalInsights/workspaces` | 1 | Requires Azure CLI re-auth | Requires Azure CLI re-auth | Log Analytics |
| `Microsoft.Insights/components` | 1 | Requires Azure CLI re-auth | Requires Azure CLI re-auth | Application Insights |

**Status:** Blocked until Azure CLI token cache is refreshed with `az login`.

The provisioning inventory is small and cost-optimized, but validation must run after Azure CLI authentication is repaired.

---

## 8. Execution Checklist

### Phase 1: Planning

- [x] Analyze workspace
- [x] Gather initial requirements
- [x] Detect subscription
- [ ] Confirm subscription and location with user
- [x] Prepare resource inventory
- [ ] Fetch quotas and validate capacity after Azure CLI re-auth
- [x] Scan codebase
- [x] Select recipe
- [x] Plan architecture
- [x] User approved this plan

### Phase 2: Execution

- [ ] Research selected services
- [x] Generate `azure.yaml`
- [x] Generate Bicep infrastructure files under `infra/`
- [x] Configure Container Apps ingress and health probes
- [x] Reuse existing Dockerfile
- [x] Add deployment notes to README
- [x] Update plan status to `Ready for Validation`

### Phase 3: Validation

- [x] Invoke azure-validate skill
- [ ] Validate Azure CLI authentication
- [x] Validate Bicep syntax
- [ ] Validate AZD configuration
- [x] Validate Docker build
- [ ] Validate quota/capacity
- [ ] Update plan status to `Validated`

### Phase 4: Deployment

- [ ] Invoke azure-deploy skill
- [ ] Provision Azure resources
- [ ] Build and push image to Azure Container Registry
- [ ] Deploy Container App
- [ ] Verify public endpoint
- [ ] Verify `/health`
- [ ] Update plan status to `Deployed`

---

## 9. Validation Proof

| Check | Command Run | Result | Timestamp |
|-------|-------------|--------|-----------|
| Local lint | `npm run lint` | Pass | 2026-06-16 |
| Local tests | `npm test` | Pass | 2026-06-16 |
| Local coverage | `npm run coverage` | Pass, 100% | 2026-06-16 |
| Local build | `npm run build` | Pass | 2026-06-16 |
| Docker build | `docker build -t ci-cd-cloud-lab .` | Pass | 2026-06-16 |
| Docker runtime | `docker run ...` plus endpoint checks | Pass | 2026-06-16 |
| Bicep compile | `az bicep build --file infra/main.bicep` | Pass | 2026-06-16 |
| AZD installation | `winget list --id Microsoft.Azd` | Installed, but current shell cannot resolve `azd` until PATH/session refresh | 2026-06-16 |
| AZD executable | `C:\Users\globber\AppData\Local\Programs\Azure Dev CLI\azd.exe version` | Pass | 2026-06-16 |
| AZD environment | `azd env new dev`, `azd env set AZURE_SUBSCRIPTION_ID ...`, `azd env set AZURE_LOCATION eastus` | Pass | 2026-06-16 |
| AZD auth check | `azd auth login --check-status` | Not logged in | 2026-06-16 |
| AZD device login | `azd auth login --use-device-code` | Timed out before login completed in Codex shell | 2026-06-16 |
| AZD validation | `azd provision --preview --no-prompt`, `azd package --no-prompt` | Blocked until AZD auth is completed | 2026-06-16 |

**Validated by:** azure-validate partial run. Full Azure validation still required before deployment.

---

## Role Assignment Verification

| Identity | Role | Scope | Status |
|----------|------|-------|--------|
| Container App system-assigned managed identity | AcrPull (`7f951dda-4ed3-4680-a7ca-43fe172d538d`) | Azure Container Registry | Verified |

The application does not access Azure data-plane services yet, so no Key Vault, Storage, SQL, Service Bus, or Cosmos DB roles are required.

---

## 10. Files to Generate

| File | Purpose | Status |
|------|---------|--------|
| `.azure/deployment-plan.md` | This plan | Created |
| `azure.yaml` | AZD configuration | Created |
| `infra/main.bicep` | Main Azure infrastructure | Created |
| `infra/main.parameters.json` | Parameters for deployment | Created |
| `infra/modules/container-app.bicep` | Container Apps, ACR, logs, monitoring | Created |
| `README.md` | Azure deployment notes | Updated |

---

## 11. Open Questions

1. Confirm deploying to subscription `Azure for Students` (`4bbe0306-d437-4cac-afbb-7de2f3964498`).
2. Confirm region `eastus`, or choose a different region such as `eastus2`, `centralus`, or `westus2`.
3. Confirm this is a cost-optimized portfolio/development deployment.
4. Refresh Azure CLI authentication with `az login` before validation/deployment.

---

## 12. Next Steps

Current phase: Ready for Validation

1. Refresh Azure CLI authentication if needed.
2. Complete AZD authentication with `azd auth login --use-device-code`.
3. Deploy with the Azure deployment workflow.
4. Verify public endpoint health checks.
