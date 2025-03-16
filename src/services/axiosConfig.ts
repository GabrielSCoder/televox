import axios, { AxiosError, AxiosInstance } from "axios";
import { API_URL } from "../utils/api";

let setErrorCallback: ((message: string | null) => void) | null = null;

export const setErrorHandler = (callback: (message: string | null) => void) => {
    setErrorCallback = callback;
};

const success = (res: any) => res;

const error = (err: AxiosError) => {
   
    if (err.response?.status === 401) {
        window.localStorage.setItem("content", "false");
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
