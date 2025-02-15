import { getRequest, postRequest, postRequestWoError } from "./requests";

export const getByUserId = async (token : string, id : string) => {
    return await getRequest(token, "/usuario/" + id)
}

export const getByUsername = async (token : string, username : string) => {
    return await getRequest(token, "/usuario/find/" + username)
}

export const signup = async (data : any) => {
    return await postRequest("", "/usuario", data)
}

export const verifyEmail = async (data : any) => {
    return await postRequestWoError("", "/usuario/verify/email", data)
}

export const verifyUsername = async (data : any) => {
    return await postRequestWoError("", "/usuario/verify/username", data)
}

export const verifyPassword = async (data : any) => {
    return await postRequestWoError("", "/usuario/verify/password", data)
}
