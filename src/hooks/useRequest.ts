import { loginAsync } from "../services/auth"
import { getPostsByFilter } from "../services/post"
import { getByUserId, getByUsername } from "../services/user"
import { postFilterDTO } from "../types/postType"

export default function useRequest() {

    const handleLogin = async (data: any) => {

        try {
           
            const resp = await loginAsync(data)
            return { success: true, data: resp.data }

        } catch (error: any) {
            return { success: false, data: [], msg: error.response.data.error ?? "Erro desconhecido" }
        }

    }

    const handleGetByUsername = async ( username: string) => {
        try {
            const resp = await getByUsername( username ?? "")
            return ({success: true, dados : resp.data.dados})
        } catch (error) {
            return ({ success: false, msg : error})
        }
    }

    const handleGetById = async ( id: string) => {
        try {
            const resp = await getByUserId( id ?? "")
            return ({success: true, dados : resp.data.dados})
        } catch (error) {
            return ({ success: false, msg : error})
        }
    }

    const handleGetPostsByFilter = async (data : postFilterDTO) => {

        try {
            const resp = await getPostsByFilter( data)
            return ({success : true, dados : resp.data})
        } catch (error) {
            return ({success : false, msg : error})
        }
    }

    return {
        handleLogin, handleGetByUsername, handleGetPostsByFilter, handleGetById
    }
}