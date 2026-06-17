# Operations Runbook

## Local Health Check

Run the app locally:

```bash
node src/index.js
```

Verify endpoints:

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/ready
```

## Container Health Check

Build and run the image:

```bash
docker build -t ci-cd-cloud-lab .
docker run --rm -p 3000:3000 ci-cd-cloud-lab
```

Verify:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/ready
```

## Azure Preflight

Use this before deploying:

```bash
azd auth login --check-status
azd env get-values
az bicep build --file infra/main.bicep
azd provision --preview --no-prompt
azd package --no-prompt
```

## Deployment

Provision infrastructure:

```bash
azd provision --no-prompt
```

Deploy the app:

```bash
azd deploy --no-prompt
```

Get outputs:

```bash
azd env get-values
```

## Post-Deployment Verification

Replace `<url>` with the deployed Container App URL:

```bash
curl https://<url>/
curl https://<url>/health
curl https://<url>/ready
```

Expected health response:

```json
{"status":"healthy"}
```

Expected readiness response:

```json
{"status":"ready"}
```

## Rollback

Azure Container Apps keeps revisions. If a deployment fails:

1. Open the Container App in Azure Portal.
2. Go to **Revisions and replicas**.
3. Find the last healthy revision.
4. Shift traffic back to that revision.
5. Investigate the failed revision logs.

CLI rollback pattern:

```bash
az containerapp revision list --name <app-name> --resource-group <resource-group> --output table
az containerapp ingress traffic set --name <app-name> --resource-group <resource-group> --revision-weight <good-revision>=100
```

## Common Issues

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `ReadOnlyDisabledSubscription` | Azure subscription is expired or disabled | Reactivate subscription or choose another active subscription |
| Container restarts | `/health` failing or wrong port | Confirm app listens on `0.0.0.0:3000` and probes use port `3000` |
| Image pull failure | Missing ACR pull permission | Verify the managed identity has `AcrPull` on the registry |
| `azd` not found | PATH not refreshed after install | Use full path or open a new terminal |
| GitLab deploy auth failure | Missing service principal variables | Verify protected CI/CD variables |
