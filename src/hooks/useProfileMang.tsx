import { useEffect, useState } from "react"
import { responsePostFilterDTO } from "../types/postType"
import { profile } from "../types/profileType"
import useRequest from "./useRequest"
import { compareForm, followForm } from "../types/follow"
import { getAllFollowers, getAllFollowersCompare, getTotalizerF, VerifyFollowing, VerifyFollowingCompare, VerifyXY } from "../services/follow"
import { socket } from "../services/socket"

export default function useProfileMang() {

    const { handleGetByUsername, handleGetPostsByFilter, handleGetById } = useRequest()
    const [ProfileData, setProfileData] = useState<profile | null>()
    const [ProfilePostQTD, setProfilePostQTD] = useState(-1)
    const [postsData, setPostsData] = useState<responsePostFilterDTO>()
    const [followersData, setFollowersData] = useState([])
    const [followingData, setFollowingData] = useState([])
    const [Profileloading, setProfileLoading] = useState(true)
    const [followSituation, setFollowSituation] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [inx, setInx] = useState(false)


    //função para chamar quando não estiver logado
    async function getProfileWithUser(username: string, userData : any) {
        console.log("disparou a primeira")
        setProfileLoading(true)
        const resp = await handleGetByUsername( username ?? "")

        if (resp.success) {
            if (resp.dados != ProfileData) {
                setProfileData(resp.dados)
                await verifyUserXYithY({ follower_id: userData.id, following_id: resp.dados.id })
                await getPostsData(resp.dados.username)
                await Totalizer(resp.dados.id, userData.id)
            }
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }

    //função para chamar quando estiver logado
    async function getProfileWithoutUser(username: string) {
        console.log("disparou a segunda")
        setProfileLoading(true)
        const resp = await handleGetByUsername( username ?? "")

        if (resp.success) {
            if (resp.dados != ProfileData) {
                setProfileData(resp.dados)
                await getPostsData(resp.dados?.username)
                await Totalizer(resp.dados.id)
            }
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }

    async function getPostsData(username: string) {
        const resp = await handleGetPostsByFilter( { usuario: username ?? "", numeroPagina: 1, tamanhoPagina: 10 })
        if (resp.success) {
            setProfilePostQTD(resp.dados.dados.quantidade_postagens)
            setPostsData(resp.dados.dados.listaPostagens)
        }
    }

    async function verifyUserXYithY(data: followForm) {

        if (data.follower_id != data.following_id) {
            const resp = await VerifyXY({ ...data })
            if (resp) {
                console.log("follow resp", resp.data.dados)
                if (resp.data.dados) {
                    if (resp.data.dados.seguindo && resp.data.dados.seguido) {
                        setFollowSituation(1) //Deixar de seguir
                    } else if (!resp.data.dados.seguindo && resp.data.dados.seguido) {
                        setFollowSituation(2) //seguir de volta
                    } else {
                        setFollowSituation(3) //seguir
                    }
                }
            }
        }

    }

    async function getFollowers(id: any) {
        if (id) {
            const resp = await getAllFollowers( id)
            setFollowersData(resp.data)
        }
    }

    async function getFollowing(id: any) {
        if (id) {
            const resp = await VerifyFollowing(id)
            setFollowingData(resp.data)
        }
    }

    async function getCompareFollowers(data : compareForm) {
        if (data) {
            const resp = await getAllFollowersCompare({user_id : data.user_id , compare_id : data.compare_id })
            setFollowersData(resp.data)
        }
    }

    async function getCompareFollowing(data : compareForm) {
        if (data) {
            const resp = await VerifyFollowingCompare({user_id : data.user_id , compare_id : data.compare_id })
            setFollowingData(resp.data)
        }
    }


    async function Totalizer(id: number, loggedUsedId ?: number) {
        const resp = await getTotalizerF(id)
        if (resp) {
            setFollowers(resp.data.dados.TotalFollowers)
            setFollowing(resp.data.dados.TotalFollowings)
            if (loggedUsedId && id == loggedUsedId) {
                await getFollowers(id)
                await getFollowing(id)
            } else if (loggedUsedId) {
                await getCompareFollowers({compare_id : loggedUsedId, user_id : id})
                await getCompareFollowing({compare_id : loggedUsedId, user_id : id})
            }
          
        }
    }



    const handleFollow = (data: followForm) => {
        socket.emit("follow", data)
    }

    const handleUnfollow = (data: followForm) => {
        socket.emit("unfollow", data)
    }


    useEffect(() => {

        socket.connect()

        socket.on("connect", () => {
            console.log("conectando")
        })

        socket.on("followResponse", (data) => {
          
            if (data) {
                getFollowers(data.dados.following_id)
                setFollowers(data.total.TotalFollowers)
                setFollowing(data.total.TotalFollowings)
                verifyUserXYithY(data.dados)
            }
        })

        socket.on("unfollowResponse", (data) => {
            
            if (data) {
                getFollowers(data.dados.following_id)
                setFollowers(data.total.TotalFollowers)
                setFollowing(data.total.TotalFollowings)
                verifyUserXYithY(data.dados)
            }
        })

        return () => {
            socket.off("unfollowResponse")
            socket.disconnect()
        }

    }, [])

    return {
        getFollowers,
        getFollowing,
        getProfileWithUser,
        getProfileWithoutUser,
        verifyUserXYithY,
        handleFollow,
        handleUnfollow,
        followersData,
        followingData,
        ProfileData,
        postsData,
        ProfilePostQTD,
        Profileloading,
        inx,
        followSituation,
        followers,
        following
    }
}