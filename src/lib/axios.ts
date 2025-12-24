import Axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";

export const api = Axios.create({
    baseURL: env.API_URL,
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = "application/json";
    }

    config.withCredentials = true;
    return config;
}

// api.interceptors.request.use(
//     (config) => {
//         const token = getAccessToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         // Set Content-Type for JSON requests, but not for FormData
//         if (!(config.data instanceof FormData)) {
//             config.headers["Content-Type"] = "application/json";
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        const message = error.response?.data?.message || error.message;
    },
);
