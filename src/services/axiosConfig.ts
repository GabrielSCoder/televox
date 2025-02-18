import axios, { AxiosInstance } from "axios";
import { API_URL } from "../utils/api";


const success = (res: any) => res;

const error = (err: { response?: { status: number } }) => {

    if (err.response?.status === 403) {
        window.sessionStorage.setItem("content", "false")
        window.location.href = "/";
        return;
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
