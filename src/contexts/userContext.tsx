import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { accessAsync, logadoAsync, logoutAsync } from "../services/auth";
import useRequest from "../hooks/useRequest";

interface AuthContextType {

    usuario_ID: number | null
    tipo_usuario: string
    loading: boolean

    userData: any
    verificarAuth: Function
    getToken: Function
    login: Function
    logout: Function
}

type props = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType>({

    usuario_ID: -1,
    tipo_usuario: "convidado",
    loading: true,
    userData: "",

    verificarAuth: async () => { },
    getToken: () => "",
    login: () => "",
    logout: () => "",
});

export function AuthProvider(props: props) {

    const [tipo_usuario, setTipo_Usuario] = useState("convidado")
    const [usuario_ID, setUsuarioID] = useState(-1)
    const [tokenAccess, setTokenAccess] = useState("")
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(true)
    const { handleLogin } = useRequest()
    const { children } = props


    const verificarAuth = async () => {

        try {
            setLoading(true)
            const resp = await accessAsync()
            if (resp.data.success) {
                setTokenAccess(resp.data.token)
                const r = await logadoAsync(resp.data.token)
                console.log("r :", r)
                setUserData(r.data.user)
                setUsuarioID(r.data.user.id)
                setTipo_Usuario("conta")
                window.sessionStorage.setItem("content", "true")
            }
        } catch (error) {
            window.sessionStorage.setItem("content", "false")
        } finally {
            setLoading(false)
        }

    }

    const login = async (data: any) => {
        const resp = await handleLogin(data)
        if (resp.success) {
            setTipo_Usuario("conta")
            setTokenAccess(resp.data.token)
            const r = await logadoAsync(resp.data.token)
            setUserData(r.data.user)
            setUsuarioID(resp.data.usuario_id)
            window.sessionStorage.setItem("content", "true")
        }
        return (resp)
    }

    const logout = async () => {
        
        setLoading(true)
        const delay = new Promise(resolve => setTimeout(resolve, 2000));

       
        const resp = await Promise.all([logoutAsync(), delay]);

        if (resp[0].data.success) {
            window.sessionStorage.setItem("content", "false");
        }

        setLoading(false)
    }

    const getToken = () => tokenAccess

    useEffect(() => {
        verificarAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ usuario_ID, tipo_usuario, loading, userData, verificarAuth, getToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
