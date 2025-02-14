import { getRequest, postRequest, postRequestWoError } from "./requests";

export const getByUserId = async (token : string, id : string) => {
    return await getRequest(token, "/usuario/" + id)
}

export const getByUsername = async (token : string, username : string) => {
    return await getRequest(token, "/usuario/find/" + username)
}

export const verifyEmail = async (data : any) => {
    return await postRequestWoError("", "/usuario/verify/", data)
}
