import getaxios from "./axiosConfig";
import { generateHMAC } from "./crypto";
import { getIPAddress } from "./soinformation";

const secret_key = "DEUSEFIEL123"

export const getRequest = async (url: string) => {

    const ip = await getIPAddress()
    const hmac = await generateHMAC(ip, secret_key)
    const axios = await getaxios();

    try {
        return axios.get(url, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now(),
            },
            withCredentials : true
        });

    } catch (error) {
        throw error
    }
}

export const postRequest = async (url: string, obj: any) => {

    const ip = await getIPAddress()
    const hmac = await generateHMAC(ip, secret_key)

    const axios = await getaxios();

    try {
        return axios.post(url, obj, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                Timestamp : Date.now()
            },
            withCredentials : true
        });
    } catch (error: any) {
        throw (error);
    }
};


export const putRequest = async (url: string, obj: any) => {

    const ip = await getIPAddress()
    const hmac = await generateHMAC(ip, secret_key)

    const axios = await getaxios();

    try {
        return axios.put(url, obj, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now()
            },
            withCredentials : true
        });
    } catch (error: any) {
        throw (error);
    }
};


export const postRequestWoError = async (url: string, obj: any) => {
    
    const axios = await getaxios();
    const ip = await getIPAddress()
    const hmac = await generateHMAC(ip, secret_key)

    try {
        return axios.post(url, obj, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now()
            },
            withCredentials : true
        });
    } catch (error: any) {
        return (error);
    }
}