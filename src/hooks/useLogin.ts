import { login } from "../services/auth"

export default function useLogin() {

    const handleLogin = async (data: any) => {

        try {
            const resp = await login({email : data.email, senha : data.senha})

            return {success : true, data : resp.data}

        } catch (error : any) {
           return {success : false, msg : error.response.data ?? "Erro desconhecido"}
        }

    }

    return {
        handleLogin
    }
}