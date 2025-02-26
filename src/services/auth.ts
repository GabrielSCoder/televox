import { getRequest, postRequest } from "./requests";

export const login = async (data : {email : string, senha : string}) => {
    return await postRequest("/auth/login", data)
}

export const logoutAsync = async () => {
    return await getRequest("/auth/logout")
}

export const logadoAsync = async () => {
    return await getRequest("/auth/logado")
}

export const refreshAsync = async () => {
    return await getRequest("/auth/refresh")
}

export const accessAsync = async () => {
    return await getRequest("/auth/access")
} 
