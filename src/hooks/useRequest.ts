import { login } from "../services/auth"
import { getPostsByFilter } from "../services/post"
import { getByUsername } from "../services/user"
import { postFilterDTO } from "../types/postType"

export default function useRequest() {

    const handleLogin = async (data: any) => {

        try {
            const resp = await login({ email: data.email, senha: data.senha })

            return { success: true, data: resp.data }

        } catch (error: any) {
            return { success: false, msg: error.response.data ?? "Erro desconhecido" }
        }

    }

    const handleGetByUsername = async (token: string, username: string) => {
        try {
            const resp = await getByUsername(token, username ?? "")
            return ({success: true, dados : resp.data.dados})
        } catch (error) {
            return ({ success: false, msg : error})
        }
    }

    const handleGetPostsByFilter = async (token : string, data : postFilterDTO) => {

        try {
            const resp = await getPostsByFilter(token, data)
            return ({success : true, dados : resp.data})
        } catch (error) {
            return ({success : false, msg : error})
        }
    }

    return {
        handleLogin, handleGetByUsername, handleGetPostsByFilter
    }
}