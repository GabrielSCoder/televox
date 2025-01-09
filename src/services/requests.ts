import getaxios from "./axiosConfig";

export const getRequest = async (url : string) => {
    const axios = await getaxios();

    try {
        const resp = await axios.get(url);
        return resp;

    } catch (error) {
        throw error
    }
}

export const postRequest = async (url: string, obj: any) => {
    const axios = await getaxios();

    try {
        const response = await axios.post(url, obj);
        return {
            dados: response.data.dados,
            ...response.data,
        };
    } catch (error: any) {
        throw (error);
    }
};