# ACCESS Integration Dashboard Django WebApp

## Prerequisites

NodeJS : https://nodejs.org/en/download

## Run the React Code

This would run a web app on localhost pointing to the beta server.

`cd ./IntegrationBadgesUI/integration-badges-ui-react`

`npm install`

`npm run dev`

http://localhost:5173/

## Build the React Code

This would build the react code and put them to the static folder of the Django app.

`npm install`

`npm run build`


## Webapp CDN Integration 

```html

<-- ########### favicon ########### -->
<!-- IE -->
<link rel="shortcut icon" type="image/x-icon"
      href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_IntegrationBadges@1.3.0/favicon.ico"/>
<!-- other browsers -->
<link rel="icon" type="image/x-icon"
      href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_IntegrationBadges@1.3.0/favicon.ico"/>
<link rel="icon" type="image/vnd.microsoft.icon"
      href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_IntegrationBadges@1.3.0/favicon.ico"/>

<-- ########### fonts ########### -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap" rel="stylesheet">

<script>
    window.SETTINGS = {
        APP_BASENAME: "/IntegrationBadgesUI",
        OPERATIONS_API_BASE_URL: "https://operations-api.access-ci.org",
        DASHBOARD_BASE_URL: window.location.origin,

        // OPERATIONS_API_INTEGRATION_BADGES_PATH: "/wh2/integration_badges/v1",
        // OPERATIONS_API_ORGANIZATIONS_PATH: "/wh2/cider/v1",
        // DISABLE_DASHBOARD_AUTHENTICATION: "true"
    };
</script>
<script type="module" crossorigin
        src="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_IntegrationBadges@1.3.0/build/index.js"></script>
<link rel="stylesheet" crossorigin
        href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_IntegrationBadges@1.3.0/build/index.css"/>
<div id="Operations_WebApp_IntegrationBadges"></div>
```

## Upgrade Dependencies

### Safe Upgrade (within allowed semver in the package.json)

https://docs.npmjs.com/about-semantic-versioning

1. Check for available updates:

   This outputs a table displaying *Current*, *Wanted*, and *Latest* versions.
   ```bash
   npm outdated
   ```

2. Upgrade to the "Wanted" version:

   Run this to update all packages, or target a single package safely.
   ```bash
   npm update
   ```
   *Or for a single package:*
   ```bash
   npm update <package-name>
   ```

### Force Upgrade (to latest major versions)

1. Modify the `package.json` file:

   This overwrites your existing version rules with the absolute newest versions.
   ```bash
   npx npm-check-updates -u
   ```

2. Install the new versions:

   Download the rewritten dependencies and refresh your lockfile.
   ```bash
   npm install
   ```
    *Or for a single package:*
   ```bash
   npm install <package-name>@latest --save
   ```
