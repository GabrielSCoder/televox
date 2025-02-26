import getaxios from "./axiosConfig";

export const getRequest = async (url: string) => {


    const axios = await getaxios();

    try {
        return axios.get(url, {
            headers: {
                Authorization: window.sessionStorage.getItem("profile") ? `Bearer ${window.sessionStorage.getItem("profile")}` : "",
            },
            withCredentials : true
        });

    } catch (error) {
        throw error
    }
}

export const postRequest = async (url: string, obj: any) => {



    const axios = await getaxios();

    try {
        return axios.post(url, obj, {
            headers: {
                Authorization: window.sessionStorage.getItem("profile") ? `Bearer ${window.sessionStorage.getItem("profile")}` : "",
            },
            withCredentials : true
        });
    } catch (error: any) {
        throw (error);
    }
};

export const postRequestWoError = async (url: string, obj: any) => {
    
    const axios = await getaxios();

    try {
        return axios.post(url, obj, {
            headers: {
                Authorization: window.sessionStorage.getItem("profile") ? `Bearer ${window.sessionStorage.getItem("profile")}` : "",
            },
            withCredentials : true
        });
    } catch (error: any) {
        return (error);
    }
}