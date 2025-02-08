import { login } from "../services/auth"

export default function useLogin() {

    const handleLogin = async (data: any) => {

        const resp = await login(data)

        if (resp.status == 200) {
            localStorage.setItem("token", resp.dados.sign)
        }

        return resp
    }

    const checkLogin = async (token : string) => {

    }

    return {
        handleLogin
    }
}