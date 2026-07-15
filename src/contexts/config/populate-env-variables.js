import packageJson from '../../../package.json';

if (!window.SETTINGS) {
    window.SETTINGS = {};
}

// Explicit assignments allow Vite's compiler to replace them at build time
window.SETTINGS.APP_BASENAME =
    window.SETTINGS.APP_BASENAME || import.meta.env.VITE_APP_BASENAME;

window.SETTINGS.OPERATIONS_API_BASE_URL =
    window.SETTINGS.OPERATIONS_API_BASE_URL || import.meta.env.VITE_OPERATIONS_API_BASE_URL;

window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH =
    window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH || import.meta.env.VITE_OPERATIONS_API_INTEGRATION_BADGES_PATH;

window.SETTINGS.OPERATIONS_API_CIDER_PATH =
    window.SETTINGS.OPERATIONS_API_CIDER_PATH || import.meta.env.VITE_OPERATIONS_API_CIDER_PATH;

window.SETTINGS.DASHBOARD_BASE_URL =
    window.SETTINGS.DASHBOARD_BASE_URL || import.meta.env.VITE_DASHBOARD_BASE_URL;

window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION =
    window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION || import.meta.env.VITE_DISABLE_DASHBOARD_AUTHENTICATION;


// Fallback formatting and normalization
if (!window.SETTINGS.APP_BASENAME) {
    window.SETTINGS.APP_BASENAME = "/";
}
if (!/([\\/])$/.test(window.SETTINGS.APP_BASENAME)) {
    window.SETTINGS.APP_BASENAME += "/";
}

window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION =
    window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION === "true" || window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION === true;

window.SETTINGS.WEBAPP_VERSION = packageJson.version;

console.log("###### window.SETTINGS : ", window.SETTINGS);
