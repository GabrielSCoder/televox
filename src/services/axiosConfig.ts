import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { API_URL } from "../utils/api";

let setErrorCallback: ((message: string | null) => void) | null = null;

export const setErrorHandler = (callback: (message: string | null) => void) => {
    setErrorCallback = callback;
};

const success = (res: AxiosResponse) => {
    const newToken = res.headers["authorization"];

    if (newToken) {
        const tokenValue = newToken.split(" ")[1]; 
        localStorage.setItem("profile", tokenValue); 
    }

    return res;
}

const error = (err: AxiosError) => {

    if (err.response?.status === 401 || err.response?.status === 500 && err.request.__URL__ != "http://localhost:3003/auth/login") {
        window.localStorage.removeItem("profile");
        window.location.href = "/";
        return;
    }

    if (err.code === "ERR_NETWORK") {
        console.error("❌ Erro de conexão: O servidor está offline!");
        if (setErrorCallback) setErrorCallback("⚠️ Problemas ao conectar-se ao servidor.");
    }

    return Promise.reject(err);
};

const getaxios = async (timeout = 3000) => {
    const instance: AxiosInstance = axios.create({
        baseURL: API_URL,
        timeout: timeout
    });

    instance.interceptors.response.use(success, error);

    return instance;
};

export default getaxios;
