import axios from "axios";
import {redirect} from "react-router-dom";

export const unauthorizedDashboardAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH
});

export const authorizedCiderAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_CIDER_PATH
});

export const authorizedDashboardAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH
});

export const authorizedDashboardAxiosInstanceWithoutRedirect = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH
});

addDashboardAuthInterceptor(authorizedDashboardAxiosInstance);
addDashboardAuthInterceptor(authorizedDashboardAxiosInstanceWithoutRedirect, false);
addDashboardAuthInterceptor(authorizedCiderAxiosInstance);

function addDashboardAuthInterceptor(axiosInstance, redirect = true) {
    axiosInstance.interceptors.request.use(
        async function (config) {
            if (window.SETTINGS.DISABLE_DASHBOARD_AUTHENTICATION === false) {
                let newToken;
                try {
                    newToken = await getNewToken();

                    // Update the Authorization header
                    config.headers.Authorization = `Bearer ${newToken}`;
                } catch (e) {
                    // newToken = "<no-valid-token-received-from-dashboard>"
                    if (redirect) window.location = "/login?next=" + window.location.pathname;
                }
            }

            return config;
        },
        function (error) {
            // Handle request errors
            return Promise.reject(error);
        }
    );
}

async function getNewToken() {
    throw new Error()
    try {
        const res = await axios.get(`${window.SETTINGS.DASHBOARD_BASE_URL}/badgetoken/v1/token/`);
        return res.data.token;
    } catch (error) {
        throw error;
    }
}




