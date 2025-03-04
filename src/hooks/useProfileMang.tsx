import { useEffect, useState } from "react"
import { liksList } from "../types/postType"
import { profile } from "../types/profileType"
import useRequest from "./useRequest"
import { compareForm, followForm, relationFollow } from "../types/follow"
import { getAllFollowers, getAllFollowersCompare, getTotalizerF, VerifyFollowing, VerifyFollowingCompare, VerifyXY } from "../services/follow"
import { socket } from "../services/socket"
import { getAllPostByUserIdAndReaction } from "../services/post"

export default function useProfileMang() {

    const { handleGetByUsername } = useRequest()
    const [ProfileData, setProfileData] = useState<profile | null>()
    const [ProfilePostQTD, setProfilePostQTD] = useState(-1)
    const [postsData, setPostsData] = useState<any[]>([])
    const [followersData, setFollowersData] = useState([])
    const [followingData, setFollowingData] = useState([])
    const [Profileloading, setProfileLoading] = useState(true)
    const [followSituation, setFollowSituation] = useState(0)
    const [likesList, setLikesList] = useState<liksList[]>([])
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [inx, setInx] = useState(false)


    //função para chamar quando não estiver logado
    async function getProfileWithUser(username: string, userData: any) {

        setProfileLoading(true)
        const resp = await handleGetByUsername(username ?? "")

        if (resp.success) {
            if (resp.dados != ProfileData) {
                setProfileData(resp.dados)
                await verifyUserXYithY({ follower_id: userData.id, following_id: resp.dados.id })
                await getPostsData(resp.dados.id, userData.id)
                await Totalizer(resp.dados.id, userData.id)
            }
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }

    //função para chamar quando estiver logado
    async function getProfileWithoutUser(username: string) {

        setProfileLoading(true)
        const resp = await handleGetByUsername(username ?? "")

        if (resp.success) {
            if (resp.dados != ProfileData) {
                setProfileData(resp.dados)
                // await getPostsData(resp.dados?.username)
                await Totalizer(resp.dados.id)
            }
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }

    async function getPostsData(profile_id: number, user_id: number) {
        // const resp = await handleGetPostsByFilter({ usuario: username ?? "", numeroPagina: 1, tamanhoPagina: 10 })
        const resp2 = await getAllPostByUserIdAndReaction({ userId: user_id, authorId: profile_id })
        if (resp2.data.success) {
            console.log(resp2.data)
            setProfilePostQTD(resp2.data.dados.quantidade_postagens)
            setPostsData(resp2.data.dados.listaPostagens)
            const lkList = resp2.data.dados.listaPostagens.map((value: { id: number, liked: any; total_reactions: any, total_replies : any }) => {
                return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies : value.total_replies }
            })
            setLikesList(lkList)
        }
    }

    async function verifyUserXYithY(data: followForm) {

        if (data.follower_id != data.following_id) {
            const resp = await VerifyXY({ ...data })
            if (resp) {

                if (resp.data.dados) {
                    relationshipSituation(resp.data.dados)
                }
            }
        }
    }

    function relationshipSituation(data: relationFollow) {
        if (data.seguindo && data.seguido) {
            setFollowSituation(1) //Deixar de seguir
        } else if (!data.seguindo && data.seguido) {
            setFollowSituation(2) //seguir de volta
        } else {
            setFollowSituation(3) //seguir
        }
    }

    async function getFollowers(id: any) {
        if (id) {
            const resp = await getAllFollowers(id)
            setFollowersData(resp.data)
        }
    }

    async function getFollowing(id: any) {
        if (id) {
            const resp = await VerifyFollowing(id)
            setFollowingData(resp.data)
        }
    }

    async function getCompareFollowers(data: compareForm) {
        if (data) {
            const resp = await getAllFollowersCompare({ user_id: data.user_id, compare_id: data.compare_id })
            setFollowersData(resp.data)
        }
    }

    async function getCompareFollowing(data: compareForm) {
        if (data) {
            const resp = await VerifyFollowingCompare({ user_id: data.user_id, compare_id: data.compare_id })
            setFollowingData(resp.data)
        }
    }

    //Recebe o id para pesquisa dos seguindo e seguidores e verifica se recebe o id do usuario logado e se são iguais, se não, ele retornar a lista do id em comparação com o usuario
    async function Totalizer(id: number, loggedUsedId?: number) {

        const resp = await getTotalizerF(id)

        if (resp) {
            setFollowers(resp.data.dados.TotalFollowers)
            setFollowing(resp.data.dados.TotalFollowings)

            if (loggedUsedId && id == loggedUsedId) {
                await getFollowers(id)
                await getFollowing(id)
            } else if (loggedUsedId) {

                await getCompareFollowers({ compare_id: loggedUsedId, user_id: id })
                await getCompareFollowing({ compare_id: loggedUsedId, user_id: id })
            } else {
                console.log("3")
            }

        }
    }

    async function TotalizerByResponse(id: number, loggedUsedId?: number) {

        if (loggedUsedId && id == loggedUsedId) {

            await getFollowers(id)
            await getFollowing(id)
        } else if (loggedUsedId) {

            await getCompareFollowers({ compare_id: loggedUsedId, user_id: id })
            await getCompareFollowing({ compare_id: loggedUsedId, user_id: id })
        } else {
            console.log("3")
        }

    }

    const handleFollow = (data: followForm) => {
        socket.emit("follow", data)
    }

    const handleUnfollow = (data: followForm) => {
        socket.emit("unfollow", data)
    }

    const handleReaction = (data: { post_id: number, usuario_id: number }) => {
        console.log(data)
        socket.emit("react", data)
    }

    useEffect(() => {

        socket.connect()

        socket.on("connect", () => {
            console.log("conectando")
        })

        socket.on("reactResponse", (data) => {
            
            setLikesList((prev) =>
                prev.map((post) =>
                    post.id === data.data.post_id
                        ? { ...post, liked: data.liked.liked, total_reactions: data.total.total_reactions }
                        : post
                )
            );

        })

        socket.on("followResponse", (data) => {

            console.log("----recebendo resposta de follow-----\n")
            console.log(data)

            if (data) {
                relationshipSituation(data.relacao)
                setFollowers(data.total.TotalFollowers)
                setFollowing(data.total.TotalFollowings)
                if (data.dados.invertTotalizer) {  //Normalmente o id do totalizer é do perfil que seguiu, o invert faz com que receba a lista do usuario que foi seguido

                    TotalizerByResponse(data.dados.profileId, data.dados.follower_id) //Quando estou na lista de seg. de algum profile e quero comparar com os meus 
                } else {

                    TotalizerByResponse(data.dados.follower_id, data.dados.profileId)
                }
            }
        })

        socket.on("unfollowResponse", (data) => {

            console.log("----recebendo respota de unfollow-----\n")
            console.log(data)

            if (data) {
                relationshipSituation(data.relacao)
                setFollowers(data.total.TotalFollowers)
                setFollowing(data.total.TotalFollowings)
                if (data.dados.invertTotalizer) {

                    TotalizerByResponse(data.dados.profileId, data.dados.follower_id)
                } else {

                    TotalizerByResponse(data.dados.follower_id, data.dados.profileId)
                }
            }
        })

        socket.on("replyResponse", (data) => {
            console.log("reposta de reply\n")
            console.log(data)
        })

        return () => {
            socket.off("reactResponse")
            socket.off("followResponse")
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
        handleReaction,
        followersData,
        followingData,
        ProfileData,
        postsData,
        ProfilePostQTD,
        Profileloading,
        inx,
        followSituation,
        likesList,
        followers,
        following
    }
}