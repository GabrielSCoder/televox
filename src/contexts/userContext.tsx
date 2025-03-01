import { useState } from "react";
import { logadoAsync, logoutAsync } from "../services/auth";
import useRequest from "../hooks/useRequest";
import { socket } from "../services/socket";


export function AuthProvider() {

    const tipo_usuario = window.localStorage.getItem("content") == "true" ? "conta" : "convidado"
    const [authLoading, setAuthLoading] = useState(false)
    const { handleLogin } = useRequest()

    const getUser = async () => {
        setAuthLoading(true)
        try {
            const resp = await logadoAsync()
            return resp
        } catch (error) {
            console.log(error)
        } finally {
            setAuthLoading(false)
        }

    }

    const login = async (data: any) => {
        const resp = await handleLogin(data)
        if (resp.success) {
            window.sessionStorage.setItem("profile", resp.data.token)
            window.localStorage.setItem("content", "true")
        }
        return (resp)
    }

    const logout = async () => {

        setAuthLoading(true)
        const delay = new Promise(resolve => setTimeout(resolve, 2000));


        const resp = await Promise.all([logoutAsync(), delay]);

        if (resp[0].data.success) {
            window.localStorage.setItem("content", "false");
            window.sessionStorage.clear()
            socket.disconnect()
        }

        setAuthLoading(false)
    }

    return {
        authLoading,
        tipo_usuario,
        getUser,
        login,
        logout
    }
    
     
     

}

