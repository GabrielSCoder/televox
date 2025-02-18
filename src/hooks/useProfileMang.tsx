import { useState } from "react"
import { useAuth } from "../contexts/userContext"
import { responsePostFilterDTO } from "../types/postType"
import { profile } from "../types/profileType"
import useRequest from "./useRequest"

export function useProfileMang() {

    const { handleGetByUsername, handleGetPostsByFilter, handleGetById } = useRequest()
    const {usuario_ID, getToken } = useAuth()
    const [ProfileData, setProfileData] = useState<profile>()
    const [ProfilePostQTD, setProfilePostQTD] = useState(-1)
    const [postsData, setPostsData] = useState<responsePostFilterDTO>()
    const [loading, setLoading] = useState(true)
    const [inx, setInx] = useState(false)

    async function getProfileData (username : string) {
        setLoading(true)
        const resp = await handleGetByUsername(getToken(), username ?? "")
        if (resp.success) {
            setProfileData(resp.dados)
            await getPostsData(username)
        } else {
            setInx(true)
        }
        setLoading(false)
    }
    async function getProfileData2 (id : string) {
        setLoading(true)
        const resp = await handleGetById(getToken(), id)
        if (resp.success) {
            setProfileData(resp.dados)
            await getPostsData(resp.dados?.username)
        }
        setLoading(false)
    }

    async function getPostsData(username  : string) {
        const resp = await handleGetPostsByFilter(getToken(), { usuario: username ?? "", numeroPagina: 1, tamanhoPagina: 10 })
        if (resp.success) {
            setProfilePostQTD(resp.dados.dados.quantidade_postagens)
            setPostsData(resp.dados.dados.listaPostagens)
        }
    }

    return {
        getProfileData,
        getProfileData2,
        usuario_ID,
        ProfileData,
        postsData,
        ProfilePostQTD,
        loading,
        inx
    }
}