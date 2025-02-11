import { getRequest, postRequest } from "./requests";

export const login = async (data : {email : string, senha : string}) => {
    return await postRequest("", "/auth/login", data)
}

export const logadoAsync = async () => {
    return await getRequest("", "/auth/logado")
}

export const refreshAsync = async () => {
    return await getRequest("","/auth/refresh")
} 
