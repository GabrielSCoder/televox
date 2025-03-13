import { usuarioFilterDTO } from "../types/user";
import { getRequest, postRequest, postRequestWoError, putRequest } from "./requests";

export const getByUserId = async (  id : string) => {
    return await getRequest("/usuario/" + id)
}

export const getByUsername = async ( username : string) => {
    return await getRequest("/usuario/find/" + username)
}

export const getUserByFilter = async ( data : usuarioFilterDTO) => {
    return await postRequest("/usuario/getByFilter", data)
}

export const signup = async (data : any) => {
    return await postRequest("/usuario", data)
}

export const editUser = async (data : any) => {
    return await putRequest("/usuario", data)
}

export const verifyEmail = async (data : any) => {
    return await postRequestWoError("/usuario/verify/email", data)
}

export const verifyUsername = async (data : any) => {
    return await postRequestWoError("/usuario/verify/username", data)
}

export const verifyPassword = async (data : any) => {
    return await postRequestWoError("/usuario/verify/password", data)
}
