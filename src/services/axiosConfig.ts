import axios, { AxiosInstance } from "axios";
import { API_URL } from "../utils/api";

const getaxios = async (timeout = 3000) => {

    const instance: AxiosInstance = axios.create({
        baseURL: API_URL,
        timeout: timeout
    })

    instance.interceptors.request.use(

        (config) => {
            return config
        },
        (error) => Promise.reject(error)
    )

    return instance
}

export default getaxios