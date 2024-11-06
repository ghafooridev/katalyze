![pipeline](https://github.com/Sanofi-GitHub/factory4_digital-foundation_template-frontend/actions/workflows/main_release.yml/badge.svg?branch=main)
![version](./version.svg?dummy=8484744)
![coverage-root-config](./coverage-root-config.svg?dummy=8484744)
![coverage-application](./coverage-application.svg?dummy=8484744)

# factory4_digital-foundation_template-frontend

# Repository description

This repository will contain tools to start a micro-front-end project, including Shadow Wolf. More information in the project [documentation](https://sanofi.atlassian.net/wiki/spaces/WEB/pages/64185698543/Starter+Project).

---

# Prerequisite

## Configure the following secrets for your repository:

1. General

- ARTIFACTORY_DOCKER_REGISTRY_HOST
- ARTIFACTORY_NPM_REGISTRY_AUTHURL
- ARTIFACTORY_REGISTRY_PASSWORD
- ARTIFACTORY_REGISTRY_USERNAME
- DOCKER_CONTAINER_REGISTRY_TOKEN
- DOCKER_CONTAINER_REGISTRY_USERNAME
- DOCKER_HUB_REGISTRY_PASSWORD
- DOCKER_HUB_REGISTRY_USERNAME

2. CodeGuard/Checkmarx configuration

- CODEGUARD_DOCKER_AUTH_CONFIG
- CODEGUARD_DOCKER_AUTH_ID
- CX_CLIENT_AUTH_ID
- CX_CLIENT_AUTH_SECRET

3. Sonar

- SONAR_HOST
- SONAR_HOST_URL
- SONAR_TOKEN

4. GitHub

- SANOFI_GITHUB_BOT_PRIVATE_KEY
- NPM_TOKEN_SANOFI_ELEMENTS

## Configure the following env variables for your infrastructure repository:

- VAR_INSTANA_API_KEY
- VITE_APP_ASSETS_URL
- VITE_APP_BACKEND_HTTP_URL
- VITE_APP_BACKEND_GRAPHQL_PATH
- VITE_APP_BACKEND_REST_PATH
- VITE_APP_SHADOW_WOLF_APP_URL
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_URL
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_USER_GUIDE
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_RELEASE_NOTES
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_FAQ
- VITE_APP_VERSION
- VITE_APP_RELEASE_VERSION
- VITE_APP_ENVIRONMENT
- VITE_APP_RELEASE_RC
- VITE_APP_FRONTEND_VERSION
- VITE_APP_BACKEND_VERSION
- VITE_APP_INGESTION_PIPELINE_VERSION
- VITE_APP_COGNITO_APP_DOMAIN
- VITE_APP_COGNITO_CLIENT_ID
- VITE_APP_COGNITO_USERPOOL_ID
- VITE_APP_COGNITO_PROVIDER_ID
- REACT_APP_COGNITO_REGION
- REACT_APP_COGNITO_USERPOOL_ID
- REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID
- REACT_APP_COGNITO_DOMAIN
- REACT_APP_COGNITO_PROVIDER_ID
- REACT_APP_BASE_URL
- REACT_APP_COGNITO_USERNAME
- REACT_APP_COGNITO_PASSWORD
- REACT_APP_GOOGLE_TAG_MANAGER_ID
- REACT_APP_BACKEND_URL
- REACT_APP_SERVE_URL
- REACT_APP_STATUS_PAGE_URL
- REACT_APP_KONVIW_PAGE_ID_FAQ
- REACT_APP_KONVIW_PAGE_ID_RELEASE_NOTES
- REACT_APP_KONVIW_PAGE_ID_USER_GUIDE
- REACT_APP_KONVIW_PAGE_URL
- VAR_INSTANA_API_KEY
- APP_APPLICATION_FRONTEND_URL
- APP_SHADOW_WOLF_FRONTEND_URL
- APP_GLISTEN_FRONTEND_URL
- VUE_APP_WHISPR_BASE_URL
- VUE_APP_WHISPR_BASE_WS

---

# Featuers natively built into application

### PWA (Root-Config)

Application is ready to use as PWA. Reponsible configuration is created in public directory in sw.js & manifest.json.

### GraphQL (Application)

Integrated client with authentication.

### Axios (Application)

Integrated client with authentication.

### Google Analytics (Application)

Integrated GTM with Google Analytics Tags & Events & Variables.

### Translation (Application)

Integrated translation functionality with possibility to change in the runtime. List of translations are created in public directory.

### Style Guide (Application)

Included style guide package with components using brand design [UI Elements Sanofi](https://elements.sanofidesign.com/557b0250b/p/71eae0-elements).

In Style Guide documentation You will find how to create NPM_TOKEN_SANOFI_ELEMENTS [Developer Sanofi Elements](https://elements.sanofidesign.com/557b0250b/p/01e061-developer-guide/b/60cb06)

### Glisten Client

Included Glisten Client Microfrontend. To use it You need to delcare:

- APP_GLISTEN_FRONTEND_URL
- VUE_APP_WHISPR_BASE_URL
- VUE_APP_WHISPR_BASE_WS

### Tour Guide (Root Config)

Included Tour Guide setup which allow You to provide guide for user.

### Authentication

Authentication implemented via @aws/amplify library.

### Help Page

Implemented help pages including konviw IFrame:

- User Guide
- Release Notes
- F.A.Q

### Instana (Root-Config)

Instana is already integrated in this application. Once this service is deployed, you can follow [this guide](https://sanofi.atlassian.net/wiki/spaces/IADC/pages/1238892668/How+to+set-up+an+application+in+Instana) to setup Instana for your application.

### Sonarqube (Root-Config)

Sonarqube is already integrated in this application.

---

# Local Development

## Standalone Application (Application directory)

1. `cd application`

2. Create `.env` file in application directory

3. Configure enviroment variables bellow:

- REACT_APP_COGNITO_REGION
- REACT_APP_COGNITO_USERPOOL_ID
- REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID
- REACT_APP_COGNITO_DOMAIN
- REACT_APP_COGNITO_PROVIDER_ID
- REACT_APP_BASE_URL
- REACT_APP_COGNITO_USERNAME
- REACT_APP_COGNITO_PASSWORD
- REACT_APP_GOOGLE_TAG_MANAGER_ID
- REACT_APP_BACKEND_URL
- REACT_APP_STATUS_PAGE_URL
- REACT_APP_KONVIW_PAGE_ID_FAQ
- REACT_APP_KONVIW_PAGE_ID_RELEASE_NOTES
- REACT_APP_KONVIW_PAGE_ID_USER_GUIDE
- REACT_APP_KONVIW_PAGE_URL

3. Install dependencies

```
npm install
```

4. Run application:

```
npm run start
```

## Root-Config application (Root directory)

1. Create `.env` file in root directory

2. Configure enviroment variables bellow:

- VITE_APP_ASSETS_URL
- VITE_APP_BACKEND_HTTP_URL
- VITE_APP_BACKEND_GRAPHQL_PATH
- VITE_APP_BACKEND_REST_PATH
- VITE_APP_SHADOW_WOLF_APP_URL
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_URL
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_USER_GUIDE
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_RELEASE_NOTES
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_FAQ
- VITE_APP_COGNITO_APP_DOMAIN
- VITE_APP_COGNITO_CLIENT_ID
- VITE_APP_COGNITO_USERPOOL_ID
- VITE_APP_COGNITO_PROVIDER_ID
- REACT_APP_COGNITO_REGION
- REACT_APP_COGNITO_USERPOOL_ID
- REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID
- REACT_APP_COGNITO_DOMAIN
- REACT_APP_COGNITO_PROVIDER_ID
- REACT_APP_BASE_URL
- REACT_APP_COGNITO_USERNAME
- REACT_APP_COGNITO_PASSWORD
- REACT_APP_GOOGLE_TAG_MANAGER_ID
- REACT_APP_BACKEND_URL
- REACT_APP_SERVE_URL
- REACT_APP_STATUS_PAGE_URL
- REACT_APP_KONVIW_PAGE_ID_FAQ
- REACT_APP_KONVIW_PAGE_ID_RELEASE_NOTES
- REACT_APP_KONVIW_PAGE_ID_USER_GUIDE
- REACT_APP_KONVIW_PAGE_URL
- VUE_APP_WHISPR_BASE_URL
- VUE_APP_WHISPR_BASE_WS

3. Install dependencies for Root-Config (In root workspace folder):

```
npm install
```

4. Install dependencies for Application (In Application workspace folder):

```
npm install
```

5. Build Root-Config & Application (In root workspace folder):

```
npm run build:local
```

6. Serve Root-Config & Application (In root workspace folder):

```
npm run serve
```

7. Run Root-Config dev server (In root workspace folder & Open seperate terminal):

```
npm run root-config:dev
```

## How to run unit tests for Root-Config

```
npm run root-config:test
```

## How to run unit tests for Application

```
cd application && npm run test
```

## How to run unit tests for Root-Config & Application

```
npm run test
```

## How to run integration tests

```
npm run root-config:serve:ci
```

```
npm run root-config:dev:ci
```

```
npm run test:e2e:ci
```

## How to build the project

```
npm run build
```

---

# Local Development With Docker

1. Use Dockerfile.local

2. Create `.env` file in root directory

3. Configure enviroment variables bellow:

- VITE_APP_ASSETS_URL
- VITE_APP_BACKEND_HTTP_URL
- VITE_APP_BACKEND_GRAPHQL_PATH
- VITE_APP_BACKEND_REST_PATH
- VITE_APP_SHADOW_WOLF_APP_URL
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_URL
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_USER_GUIDE
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_RELEASE_NOTES
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_FAQ
- VITE_APP_VERSION
- VITE_APP_COGNITO_APP_DOMAIN
- VITE_APP_COGNITO_CLIENT_ID
- VITE_APP_COGNITO_USERPOOL_ID
- VITE_APP_COGNITO_PROVIDER_ID
- REACT_APP_COGNITO_REGION
- REACT_APP_COGNITO_USERPOOL_ID
- REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID
- REACT_APP_COGNITO_DOMAIN
- REACT_APP_COGNITO_PROVIDER_ID
- REACT_APP_BASE_URL
- REACT_APP_COGNITO_USERNAME
- REACT_APP_COGNITO_PASSWORD
- REACT_APP_GOOGLE_TAG_MANAGER_ID
- REACT_APP_BACKEND_URL
- REACT_APP_SERVE_URL
- REACT_APP_STATUS_PAGE_URL
- REACT_APP_KONVIW_PAGE_ID_FAQ
- REACT_APP_KONVIW_PAGE_ID_RELEASE_NOTES
- REACT_APP_KONVIW_PAGE_ID_USER_GUIDE
- REACT_APP_KONVIW_PAGE_URL
- VAR_INSTANA_API_KEY
- APP_APPLICATION_FRONTEND_URL
- APP_SHADOW_WOLF_FRONTEND_URL
- APP_GLISTEN_FRONTEND_URL
- VUE_APP_WHISPR_BASE_URL
- VUE_APP_WHISPR_BASE_WS

4. Run commands

```bash
$  docker build --build-arg ARTIFACTORY_REGISTRY_USERNAME=<VALUE> --build-arg ARTIFACTORY_REGISTRY_PASSWORD=<VALUE> --build-arg ARTIFACTORY_NPM_REGISTRY_AUTHURL=<VALUE> --build-arg NPM_TOKEN_SANOFI_ELEMENTS=<VALUE> -f ./Dockerfile.local -t <IMAGE_NAME> .
```

```bash
$  docker run -p 8080:8080 --env-file ./.env <IMAGE_ID>
```

---

# Local Sonarqube

- Sonarqube infrastructure login: admin
- Sonarqube infrastructure password: admin

1. Prerequisite:

- SONAR_SERVER_URL=http://localhost:9001 | Based on sonarqube.docker-compose.yml configuration
- SONAR_TOKEN=Generate token once Your infrastructure is up

2. Increase memory

```
rdctl shell
sudo sysctl -w vm.max_map_count=262144
```

3. Run Sonarqube infrastructure

```
docker-compose -f sonarqube.docker-compose.yml up
```

4. Run Sonarqube scanner

```
npm run sonarqube-scanner
```

---

# F.A.Q

## How to get started?

Copy all files from this repository to your new front-end repo. There are some files that need to changed:

- Change name in [package.json](./package.json)
- Change MDF_NAMESPACE and MDF_REPOSITROY in [Makedockfile](./Makedockfile.conf)
- Change sonar.projectKey and sonar.projectName in [sonar-project.properties](./sonar-project.properties)
- Request "digital-factory-bot" to be added to your new repository.
- Request "code-guard" to be added to your new repository.
- Change all environment variables to your needs. Detailled information in previous steps including Github secrets.
- Remove template folder inside application directory and all corresponding tests and replace with your own coding. These files should only serve as a reference.
- If you wish to change the CI/CD configuration, you should create a new branch for your project in our [Sanofi release strategy](https://github.com/Sanofi-GitHub/fof-digital-foundation-release-strategy). The currently configured templates can still be used as your default

## Webpack build

The process of building builds for both the development environment or for deployment purposes is carried out using the Webpack library. The customized configuration is designed in the `config` folder for Root-Config and for Application.

## How to get environment variables to authenticate for Shadow Wolf

Please contact with Shadow Wolf team. All environment variables defined with VITE_APP prefix are assigned to Shadow Wolf.

## Environment variables description

- VITE_APP_ASSETS_URL - Location of Shadow Wolf micro front-end assets - Example value for local development: https://shadow-wolf-dev.sanofi.com
- VITE_APP_BACKEND_HTTP_URL - Location of Shadow Wolf micro front-end back-end - Example value for local development: https://shadow-wolf-dev.sanofi.com
- VITE_APP_BACKEND_GRAPHQL_PATH - Path to Shadow Wolf micro front-end GraphQL endpoint - Example value for local development: /api/v1/graphql
- VITE_APP_BACKEND_REST_PATH - Path to Shadow Wolf micro front-end REST API endpoint - Example value for local development: /api/v1/
- VITE_APP_SHADOW_WOLF_APP_URL - Path to Shadow Wolf micro front-end applied as a redirect URL for AWS Amplify - Example value for local development: http://localhost:8080/shadow-wolf
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_URL - Shadow Wolf Knoviw base URL - Example value for local development: https://docs.sanofi.com/cpv/wiki/spaces/konviw/pages/
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_USER_GUIDE - Shadow Wolf User guide page ID in Confluence - Example value for local development: 64016223717
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_RELEASE_NOTES - Shadow Wolf Release notes page ID in Confluence - Example value for local development: 64027493163
- VITE_APP_SHADOW_WOLF_KONVIW_PAGE_ID_FAQ - Shadow Wolf FAQ page ID in Confluence - Example value for local development: 63959861234
- VITE_APP_VERSION - Shadow Wolf app version number - Example value for local development: 0.0.0
- VITE_APP_COGNITO_APP_DOMAIN - Shadow Wolf cognito domain - Open IAWebStack Cognito Shadow Wolf
- VITE_APP_COGNITO_CLIENT_ID - Shadow Wolf cognito client ID - Open IAWebStack Cognito Shadow Wolf
- VITE_APP_COGNITO_USERPOOL_ID - Shadow Wolf cognito userpool ID - IAWebStack Cognito Shadow Wolf
- VITE_APP_COGNITO_PROVIDER_ID - Shadow Wolf cognito provider - Open IAWebStack Shadow Wolf
- REACT_APP_COGNITO_REGION - Starter Project cognito region
- REACT_APP_COGNITO_USERPOOL_ID - Starter Project cognito userpool ID
- REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID - Starter Project cognito client ID
- REACT_APP_COGNITO_DOMAIN - Starter Project cognito domain
- REACT_APP_COGNITO_PROVIDER_ID - Starter Project cognito provider
- REACT_APP_BASE_URL - Path to Starter Project application micro front-end applied as a redirect URL for AWS Amplify
- REACT_APP_COGNITO_USERNAME - Starter Project congito username value of user used in integration tests
- REACT_APP_COGNITO_PASSWORD - Starter Project congito password value of user used in integration tests
- REACT_APP_GOOGLE_TAG_MANAGER_ID - Starter Project Google Tag Manager ID created during request for creating GTM Container
- REACT_APP_BACKEND_URL - Location of Starter Project back-end
- REACT_APP_SERVE_URL - Location of Starter Project micro front-end assets
- REACT_APP_STATUS_PAGE_URL - Location of IADC Status page
- REACT_APP_KONVIW_PAGE_ID_FAQ - Starter Project FAQ page ID in Confluence
- REACT_APP_KONVIW_PAGE_ID_RELEASE_NOTES - Starter Project Release notes page ID in Confluence
- REACT_APP_KONVIW_PAGE_ID_USER_GUIDE - Starter Project User guide page ID in Confluence
- REACT_APP_KONVIW_PAGE_URL - Starter Project Knoviw base URL
- VAR_INSTANA_API_KEY - Starter Project Instana API Key assign during deployment
- APP_APPLICATION_FRONTEND_URL - Location of Starter Project micro front-end chunks
- APP_SHADOW_WOLF_FRONTEND_URL - Location of Shadow Wolf micro front-end chunks
- APP_GLISTEN_FRONTEND_URL - Location of Glisten micro front-end chunks
- VUE_APP_WHISPR_BASE_URL - Location of Glisten micro front-end back-end
- VUE_APP_WHISPR_BASE_WS - Location of Glisten micro front-end back-end

## How to collect environment variables

- In case of any confusion or problems with starting the application, please contact the Foundations Apps Team
- All environment variables which are pointing to Cognito You need to specify based on the AWS Cognito
- All environment variables which are pointing to Backend You need to specify based on Your deployment URL for backend
- All environment variables which are pointing to Location You need to specify based on the environment


