import { getRequest } from "./requests";

export const getByUserId = async (token : string, id : string) => {
    return await getRequest(token, "/usuario/" + id)
}

export const getByUsername = async (token : string, username : string) => {
    return await getRequest(token, "/usuario/find/" + username)
}