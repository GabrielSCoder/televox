import { useEffect, useState } from "react";
import FeedTemplate from "../../templates/FeedTemplate";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { getFeedMk2 } from "../../services/post";
import { AuthProvider } from "../../contexts/userContext";
import { liksList } from "../../types/postType";
import useDebounce from "../../hooks/useDebounce";
import { socket } from "../../services/socket";

// const ProfileAvatarUrl = "https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png"

export default function Home() {

    const [feedData, setFeedData] = useState([])
    const [userData, setUserData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [likesList, setLikesList] = useState<liksList[]>([])
    const { getUser } = AuthProvider()

    const getData = async () => {
        setLoading(true)
        const handle = await getUser()
        if (handle?.data) {
            setUserData(handle.data.user)
            console.log(handle.data.user)
        }
        const resp = await getFeedMk2({ id: 21, numeroPagina: 0, tamanhoPagina: 15, profile_id : handle?.data.user.id })
        if (resp.data.success) {
            setFeedData(resp.data.dados)
            console.log(resp.data.dados)
            const lkList = resp.data.dados.map((value: { id: number, liked: any; total_reactions: any, total_replies : any }) => {
                return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies : value.total_replies }
            })
            console.log(lkList)
            setLikesList(lkList)
        }
        setLoading(false)
    }

    const handleReaction = (data: { post_id: number, usuario_id: number }) => {
        console.log(data)
        socket.emit("react", data)
    }

    const debounceReact = (data: any) => {
        const xData = { post_id: data, usuario_id: userData.id }
        handleReaction(xData)
    }

    const debounceHandlerFollow = useDebounce(debounceReact, 200)

    useEffect(() => {

        socket.connect()

        socket.on("reactResponse", (data) => {
         
            setLikesList((prev) =>
                prev.map((post) =>
                    post.id === data.data.post_id
                        ? { ...post, liked: data.liked.liked, total_reactions: data.total.total_reactions }
                        : post
                )
            );

        })

        getData()

        return () => {
            socket.off("reactResponse")
            socket.disconnect()
        }
    }, [])

    if (loading) {
        return <LoadingPageTemplate />
    }

    return (
        <FeedTemplate feedData={feedData} userData={userData} likesList={likesList} HandleReact={debounceHandlerFollow} />
    )

}