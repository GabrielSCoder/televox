import { useEffect, useState } from "react"
import { useAuth } from "../contexts/userContext"
import { responsePostFilterDTO } from "../types/postType"
import { profile } from "../types/profileType"
import useRequest from "./useRequest"
import { followForm, followTotalizer } from "../types/follow"
import { getTotalizerF, VerifyXY } from "../services/follow"
import { socket } from "../services/socket"

export function useProfileMang() {

    const { handleGetByUsername, handleGetPostsByFilter, handleGetById } = useRequest()
    const { usuario_ID, getToken, userData } = useAuth()
    const [ProfileData, setProfileData] = useState<profile | null>(null)
    const [ProfilePostQTD, setProfilePostQTD] = useState(-1)
    const [postsData, setPostsData] = useState<responsePostFilterDTO>()
    const [Profileloading, setProfileLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [inx, setInx] = useState(false)

    async function getProfileData(username: string) {
        setProfileLoading(true)
        const resp = await handleGetByUsername(getToken(), username ?? "")
        if (resp.success) {
            console.log(resp.dados)
            setProfileData(resp.dados)
            // await Totalizer(resp.dados.id, username)
            await verifyF(resp.dados.id, username, getToken(), { follower_id: userData.id, following_id: resp.dados.id })
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }
    async function getProfileData2(id: string) {
        setProfileLoading(true)
        const resp = await handleGetById(getToken(), id)
        if (resp.success) {
            setProfileData(resp.dados)
            await getPostsData(resp.dados?.username)
        }
        setProfileLoading(false)
    }

    async function getPostsData(username: string) {
        const resp = await handleGetPostsByFilter(getToken(), { usuario: username ?? "", numeroPagina: 1, tamanhoPagina: 10 })
        if (resp.success) {
            setProfilePostQTD(resp.dados.dados.quantidade_postagens)
            setPostsData(resp.dados.dados.listaPostagens)
        }
    }

    async function verifyF(id: any, username: string, token: string, data: followForm) {

        if (data.follower_id != data.following_id) {
            const resp = await VerifyXY(token, { ...data })
            if (resp) {
                console.log(resp.data.dados)
                resp.data.dados != false ? setIsFollowing(true) : setIsFollowing(false)
            }
        }

        await Totalizer(id, username)

    }

    async function Totalizer(id: any, username: string) {
        const resp = await getTotalizerF(getToken(), id)
        if (resp) {
            console.log(resp)
            setFollowers(resp.data.TotalFollowers)
            setFollowing(resp.data.TotalFollowings)
            await getPostsData(username)
        }
    }

    
    const handleFollow = (data : followForm) => {
        socket.emit("follow", data)
    }

    const handleUnfollow = (data : followForm) => {
        socket.emit("unfollow", data)
    }

    useEffect(() => {

        socket.on("followResponse", (data) => {
            if (data) {
                setFollowers(data.TotalFollowers)
                setFollowing(data.TotalFollowings)
                setIsFollowing(true)
            }
        })

        socket.on("unfollowResponse", (data) => {
            if (data) {
                setFollowers(data.TotalFollowers)
                setFollowing(data.TotalFollowings)
                setIsFollowing(false)
            }
        })

        return () => {
            socket.off("unfollowResponse")
            socket.disconnect()
        }

    }, [])

    return {
        getProfileData,
        getProfileData2,
        verifyF,
        handleFollow,
        handleUnfollow,
        usuario_ID,
        ProfileData,
        postsData,
        ProfilePostQTD,
        Profileloading,
        inx,
        isFollowing,
        followers,
        following
    }
}