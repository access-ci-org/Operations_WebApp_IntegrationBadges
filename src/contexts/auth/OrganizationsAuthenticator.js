import axios from "axios";

export const organizationsAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_CIDER_PATH
});
