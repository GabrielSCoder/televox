import {useState } from "react";
import { logadoAsync, loginAsync, logoutAsync } from "../services/auth";


export function AuthProvider() {

    // const tipo_usuario = window.localStorage.getItem("content") == "true" ? "conta" : "convidado"
    const tipo_usuario = "conta"
    const [authLoading, setAuthLoading] = useState(false)

    const getUser = async () => {
        setAuthLoading(true);
        try {
            const resp = await logadoAsync();
            if (resp?.data?.newToken) {
                window.localStorage.setItem("profile", resp.data.newToken);
            }
            return resp;
        } catch (error) {
            console.log(error);
        } finally {
            setAuthLoading(false);
        }
    };

    const login = async (data: any) => {

        try {

            const resp = await loginAsync(data)

            if (resp.data.success) {
                window.localStorage.setItem("profile", resp.data.dados.token)
            }

            return { success: true, data: resp.data }

        } catch (error: any) {
            return { success: false, data: [], msg: error.response.data.error ?? "Erro desconhecido" }
        }

    }

    const logout = async () => {

        setAuthLoading(true)
        const delay = new Promise(resolve => setTimeout(resolve, 2000));


        const resp = await Promise.all([logoutAsync(), delay]);

        if (resp[0].data.success) {
            // window.localStorage.setItem("content", "false");
            window.localStorage.removeItem("profile")
        }

        // setAuthLoading(false)
        window.location.href = "/"
    }

    return {
        authLoading,
        tipo_usuario,
        getUser,
        login,
        logout
    }

}

