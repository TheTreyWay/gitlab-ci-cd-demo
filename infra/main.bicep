targetScope = 'subscription'

@minLength(1)
param environmentName string

@minLength(1)
param location string

var tags = {
  'azd-env-name': environmentName
  workload: 'ci-cd-cloud-lab'
}

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'rg-${environmentName}'
  location: location
  tags: tags
}

module app './modules/container-app.bicep' = {
  name: 'container-app-resources'
  scope: resourceGroup
  params: {
    environmentName: environmentName
    location: location
    serviceName: 'web'
    tags: tags
  }
}

output AZURE_RESOURCE_GROUP string = resourceGroup.name
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = app.outputs.containerRegistryLoginServer
output WEB_URL string = 'https://${app.outputs.fqdn}'
