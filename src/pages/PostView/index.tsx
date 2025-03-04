import { useNavigate, useParams } from "react-router-dom";
import { getPostbyId, getRepliesByPostId, sendPostAsync } from "../../services/post";
import { useEffect, useState } from "react";
import LoadingPageTemplate from "../../templates/LoadingPage";
import TitleTag from "../../components/TitleTags";
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatPostDate } from "../../utils/dateFormat";
import ReactionsTemplate from "../../templates/ReactionsTemplate";
import ReplyCardTemplate from "../../templates/ReplyCardTemplate";
import FeedList from "../../templates/Feed";
import { createPostForm, liksList, postView } from "../../types/postType";
import { useForm } from "react-hook-form";

type props = {
    profileData: any
    userData: any
    handleReaction : Function
}

export default function Postview(props: props) {

    const { profileData, userData, handleReaction } = props
    const { id } = useParams()
    const nav = useNavigate()

    const [postData, setPostData] = useState<postView>()
    const [repliesData, setRepliesData] = useState([])
    const {register, watch, reset} = useForm({defaultValues : {
        message : ""
    }})
    const content = watch("message")
    const [likesList, setLikesList] = useState<liksList[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingReply, setLoadingReply] = useState(false)


    const getPostData = async () => {
        setLoading(true)
        const resp = await getPostbyId({id : id ?? 0, profile_id : userData.id})
        if (resp.data.success) {
            console.log(resp.data.dados)
            setPostData(resp.data.dados)
            const date = new Date(resp.data.dados.data_criacao)
            console.log(date)
        }

        await getRepliesData(resp.data.dados)
    }

    const getRepliesData = async (data: any) => {
        const resp = await getRepliesByPostId({
            id: data.id,
            profile_id: userData.id,
            tamanhoPagina: 0,
            numeroPagina: 0
        })
        if (resp) {
            if (resp.data.success) {
                const lkList = resp.data.dados.map((value: { id: number, liked: any; total_reactions: any, total_replies: any }) => {
                    return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies: value.total_replies }
                })
                console.log(lkList)
                setLikesList(lkList)
                setRepliesData(resp.data.dados)
            }
            setLoading(false)
        }
    }

    const handlePost = async (data : any) => {

        setLoadingReply(true)
        const dt : createPostForm = {
            ...data,
            tipo : "feed",
            conteudo : content
        }

        const resp = await sendPostAsync(dt)
        if (resp.data.success) {
            reset()
            getPostData()
        }
        
        setLoadingReply(false)
    }


    useEffect(() => {
        getPostData()
    }, [])

    if (loading || loadingReply) {
        return <LoadingPageTemplate />
    }

    return (
        <div className="px-4 w-full">
            <div className="flex items-center sticky top-0 dark:bg-black bg-white bg-white/50 dark:text-white text-black w-full z-20 p-2 dark:bg-black/50 backdrop-blur-[10px]">
                <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-500 hover:cursor-pointer" onClick={() => nav("/" + profileData.username)}>
                    <IoMdArrowRoundBack className="text-white" size={20} />
                </div>
                <h2 className="pl-8 text-lg font-semibold">Post</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="rounded-full h-[40px] w-[40px] bg-purple-500 ">
                    {!profileData?.img_url ? <div className="w-full h-full rounded-full  m-2"></div> : <img src={profileData.img_url} className="h-full w-full rounded-full object-cover"></img>}
                </div>
                <div className="flex flex-col">
                    <TitleTag.Sub className="" >{profileData.nome}</TitleTag.Sub>
                    <TitleTag.Normal className="text-gray-600">@{profileData.username}</TitleTag.Normal>
                </div>
            </div>

            <div>
                <p className="text-white">{postData?.conteudo}</p>
            </div>

            <h4 className="text-gray-600">{formatPostDate(postData?.data_criacao ?? "")}</h4>

            <div className="flex items-center justify-center border-t border-b w-full border-gray-600">
                <ReactionsTemplate props={{ likes: postData.total_reactions, isLiked: postData.liked, handleReaction: undefined, id: postData.id, locked: false, replies: postData?.total_replies }} />
            </div>

            {loadingReply ? (
                <LoadingPageTemplate />
            ) : (
                <ReplyCardTemplate profileData={profileData} userData={userData} postData={postData} handleReply={handlePost} register={register} />
            )}

            <FeedList data={repliesData} handleReaction={handleReaction} likesList={likesList} userId={userData.id ?? 0} />

        </div>

    )
}