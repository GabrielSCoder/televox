import { useNavigate } from "react-router-dom";
import ReactionsTemplate from "../ReactionsTemplate";
import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";

type cardProps = {
    postId : number
    title: string;
    user?: string;
    body: string;
    likes: number;
    deslieks?: number;
    shares?: number;
    time?: string;
    username?: string
    img_url?: string
    liked : boolean
    handleReaction : any
}

const bodyTest = "Mauris eu tempor ante. Praesent semper ligula quis risus eleifend, eget congue est mattis. Praesent varius, quam a condimentum tristique, metus nisi pharetra diam, sed vehicula velit metus eget nunc. Cras commodo orci sagittis eleifend pellentesque. Aliquam metus mauris, efficitur eu ullamcorper eget, faucibus a purus. Nulla sed libero erat. Donec a semper massa. Duis pellentesque ex arcu, quis sollicitudin mauris rhoncus eu. Nullam venenatis euismod placerat. Duis vel blandit tortor."


export default function PostCard(props: cardProps) {

    const { body, title, likes, user, username, img_url, liked, handleReaction } = props

    const nav = useNavigate()

    const redirect = () => nav("/post")

    const btn = (event: React.MouseEvent) => {
        event.stopPropagation()
        nav("/" + username)
    }

    return (
        <>
            <Card className="flex-col hover:bg-gray-100 dark:hover:bg-opacity-5 hover:cursor-pointer px-4 pt-3 border-b" >
                <Card className="justify-start items-center gap-2" >
                    <div className="rounded-full h-[40px] w-[40px] bg-purple-500 ">
                        {!img_url ? <div className="w-full h-full rounded-full bg-red-500 m-2"></div> : <img src={img_url} className="h-full w-full rounded-full object-cover"></img>}
                    </div>
                    <button onClick={btn} className="">
                        <TitleTag.Sub className="hover:underline hover:decoration-white hover:cursor-pointer"> {user}</TitleTag.Sub>
                    </button>
                    <TitleTag.Normal className="text-gray-500">@{username}</TitleTag.Normal>
                    <TitleTag.Normal className="text-gray-500">- 9h</TitleTag.Normal>
                </Card>

                <Card className="ml-12 flex-col justify-start">
                    <TitleTag.Parag className="break-words text-left ">{body}</TitleTag.Parag>

                    <ReactionsTemplate props={{ likes: likes, isLiked : liked, handleReaction : handleReaction, id : props.postId}} />
                </Card>

            </Card>
        </>

    )
}