import axios, { AxiosInstance } from "axios";
import { API_URL } from "../utils/api";

const getaxios = async (timeout = 3000) => {
    const instance : AxiosInstance = axios.create({
        baseURL : API_URL,
        timeout : timeout
    })

    return instance
}

export default getaxios