import { useNavigate } from "react-router-dom";
import ReactionsTemplate from "../ReactionsTemplate";
import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";

type cardProps = {
    title: string;
    user?: string;
    body: string;
    likes: number;
    deslieks: number;
    shares: number;
    time?: string;
    username?: string
    img_url?: string
}


export default function PostCard(props: cardProps) {

    const { body, title, likes, user, username, img_url } = props

    const nav = useNavigate()

    const redirect = () => nav("/post")

    const btn = (event : React.MouseEvent) => {
        event.stopPropagation()
        nav("/" + username)
    }

    return (
        <>
            <Card className="flex-col hover:bg-gray-100 dark:hover:bg-opacity-5 hover:cursor-pointer p-4 border-b" click={redirect}>
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

                <TitleTag.Parag className="break-words text-left ml-12 mb-4">{body}</TitleTag.Parag>

                <ReactionsTemplate props={{ likes: 10, deslikes: 20, shares: 20 }} />
            </Card>
        </>

    )
}