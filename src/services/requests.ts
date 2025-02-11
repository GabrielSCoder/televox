import getaxios from "./axiosConfig";

export const getRequest = async (accessToken: string, url: string) => {

    const axios = await getaxios();

    try {
        return axios.get(url, {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
            withCredentials : true
        });

    } catch (error) {
        throw error
    }
}

export const postRequest = async (accessToken: string, url: string, obj: any) => {

    const axios = await getaxios();

    try {
        return axios.post(url, obj, {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
            withCredentials : true
        });
    } catch (error: any) {
        throw (error);
    }
};
