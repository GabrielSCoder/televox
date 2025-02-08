import { postRequest } from "./requests";

export const login = async (data : {email : string, senha : string}) => {
    return await postRequest("usuario/auth", data)
}