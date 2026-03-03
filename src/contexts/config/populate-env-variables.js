import packageJson from '../../../package.json';

// Initialise the variables from env if they are not already defined in the window
const variableNames = [
    "APP_BASENAME",

    "OPERATIONS_API_BASE_URL",

    "OPERATIONS_API_INTEGRATION_BADGES_PATH",
    "OPERATIONS_API_CIDER_PATH",

    "DASHBOARD_BASE_URL",
    "DISABLE_DASHBOARD_AUTHENTICATION"
];

if (!window.SETTINGS) {
    window.SETTINGS = {};
}

for (let i = 0; i < variableNames.length; i++) {
    const variableName = variableNames[i];
    if (!window.SETTINGS[variableName]) {
        window.SETTINGS[variableName] = import.meta.env[`VITE_${variableName}`];
    }
}

window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION = window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION === "true";

window.SETTINGS.WEBAPP_VERSION = packageJson.version;

console.log("###### window.SETTINGS : ", window.SETTINGS)
