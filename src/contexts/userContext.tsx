import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { logadoAsync, logoutAsync, refreshAsync } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { getByUserId } from "../services/user";
import useRequest from "../hooks/useRequest";

interface AuthContextType {
    logado: boolean
    usuario_ID: number | null
    tipo_usuario: string
    usuario_nome: string
    userPostData : any
    validRefresh: boolean
    postQTD : number
    loading: boolean
    userData : any

    verificarAuth: Function
    getToken: Function
    login: Function
    logout: Function
    reValid: Function
    getUserData: Function
}

type props = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType>({
    logado: false,
    usuario_ID: -1,
    postQTD : -1,
    tipo_usuario: "convidado",
    usuario_nome: "",
    validRefresh: false,
    loading: true,
    userData : "",
    userPostData : "",
    verificarAuth: async () => { },
    reValid: () => "",
    getToken: () => "",
    login: () => "",
    logout: () => "",
    getUserData: () => ""
});

export function AuthProvider(props: props) {

    const { handleGetByUsername, handleGetPostsByFilter } = useRequest()
    const [logado, setLogado] = useState(false)
    const [tipo_usuario, setTipo_Usuario] = useState("convidado")
    const [usuario_ID, setUsuarioID] = useState(-1)
    const [usuario_nome, setUsuarionNome] = useState("")
    const [tokenAccess, setTokenAccess] = useState("")
    const [validRefresh, setValidRefresh] = useState(false)
    const [userData, setUserData] = useState()
    const [userPostData, setUserPostData] = useState()
    const [postQTD, setPostQTD] = useState(-1)
    const [loading, setLoading] = useState(true)
    const { handleLogin } = useRequest()
    const { children } = props


    async function getUserData(username : string) {
        setLoading(true)
        const resp = await handleGetByUsername(getToken(), username)
        if (resp.success) {
            setUserData(resp.dados)
            await getPostsData(username)
            console.log("xxxxxxxxxx", resp)
        }
        setLoading(false)
    }

    async function getPostsData(username : string) {
        const resp = await handleGetPostsByFilter(getToken(), { usuario: username ?? "", numeroPagina: 1, tamanhoPagina: 10 })
        if (resp.success) {
            setPostQTD(resp.dados.dados.quantidade_postagens)
            setUserPostData(resp.dados.dados.listaPostagens)
            console.log("yyyyyyyy", resp)
        }
    }

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
            await getUserData(resp.data.dados.username)
        }

    }

    const logout = async () => {
        const resp = await logoutAsync()
        if (resp.data.success) setLogado(false)
        
    }

    const getToken = () => tokenAccess

    useEffect(() => {
        verificarAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ logado, usuario_ID, tipo_usuario, usuario_nome, validRefresh, loading, userData, userPostData, postQTD, verificarAuth, getToken, login, logout, reValid, getUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
