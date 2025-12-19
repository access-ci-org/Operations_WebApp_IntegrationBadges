import axios from "axios";

export const unauthorizedDashboardAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH
});

export const unauthorizedOrganizationsAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_ORGANIZATIONS_PATH
});

export const dashboardAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH
});

dashboardAxiosInstance.interceptors.request.use(
    async function (config) {
        if (window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION === false) {
            let newToken;
            try {
                newToken = await getNewToken();
            } catch (e) {
                // newToken = "<no-valid-token-received-from-dashboard>"
                window.location = "/login?next=" + window.location.pathname;
            }

            // Update the Authorization header
            config.headers.Authorization = `Bearer ${newToken}`;
        }

        return config;
    },
    function (error) {
        // Handle request errors
        return Promise.reject(error);
    }
);

async function getNewToken() {
    try {
        const res = await axios.get(`${window.SETTINGS.DASHBOARD_BASE_URL}/badgetoken/v1/token/`);
        return res.data.token;
    } catch (error) {
        throw error;
    }
}




