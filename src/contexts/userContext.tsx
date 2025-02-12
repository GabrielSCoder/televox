import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { logadoAsync, logoutAsync, refreshAsync } from "../services/auth";
import useLogin from "../hooks/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { getByUserId, getByUsername } from "../services/user";

interface AuthContextType {
    logado: boolean
    usuario_ID: number | null
    tipo_usuario: string
    usuario_nome: string
    validRefresh: boolean
    loading: boolean
    verificarAuth: Function
    getToken: Function
    login: Function
    logout: Function
    reValid: Function
}

type props = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType>({
    logado: false,
    usuario_ID: -1,
    tipo_usuario: "convidado",
    usuario_nome: "",
    validRefresh: false,
    loading: true,
    verificarAuth: async () => { },
    reValid: () => "",
    getToken: () => "",
    login: () => "",
    logout: () => ""
});

export function AuthProvider(props: props) {

    const [logado, setLogado] = useState(false)
    const [tipo_usuario, setTipo_Usuario] = useState("convidado")
    const [usuario_ID, setUsuarioID] = useState(-1)
    const [usuario_nome, setUsuarionNome] = useState("")
    const [tokenAccess, setTokenAccess] = useState("")
    const [validRefresh, setValidRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const { handleLogin } = useLogin()
    const { children } = props

    const verificarAuth = async () => {

        try {
            setLoading(true)
            const resp = await refreshAsync()
            if (resp.data.success) {
                setValidRefresh(true)
                setTokenAccess(resp.data.token)
                const r = await logadoAsync(resp.data.token)
                setUsuarioID(r.data.dados.id)
                await getUsername(resp.data.token, r.data.dados.id)
                setTipo_Usuario("conta")
                setLogado(true)
            }
        } catch (error) {
            setLogado(false)
        } finally {
            setLoading(false)
        }

    }

    const login = async (data: any) => {
        const resp = await handleLogin(data)
        if (resp.success) {
            setTipo_Usuario("conta")
            setTokenAccess(resp.data.token)
            setUsuarioID(resp.data.usuario_id)
            setLogado(true)
            await getUsername(resp.data.token, resp.data.usuario_id)
        }
        return (resp)
    }

    const reValid = async () => {

        const resp = await logadoAsync(tokenAccess)

        if (resp.data.success) {
            await getUsername(tokenAccess, usuario_ID)
        }

        return resp
    }

    const getUsername = async (token: string, id: any) => {
        console.log("getUserID :", token, id)
        const resp = await getByUserId(token, id)
        if (resp.data.success) {
            setUsuarionNome(resp.data.dados.username)
        }

    }

    const logout = async () => {
        const resp = await logoutAsync()
        console.log(resp)
        if (resp.data.success) setLogado(false)
    }

    const getToken = () => tokenAccess

    useEffect(() => {
        verificarAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ logado, usuario_ID, tipo_usuario, usuario_nome, validRefresh, loading, verificarAuth, getToken, login, logout, reValid }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);