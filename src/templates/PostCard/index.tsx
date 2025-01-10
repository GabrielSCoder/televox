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
}


export default function PostCard(props: cardProps) {

    const { body, title, likes } = props
    const nav = useNavigate()

    const redirect = () => nav("/post")

    return (
        <>
            <Card classes="flex-col hover:bg-gray-100 dark:hover:bg-gray-900 hover:cursor-pointer p-4 border-b" click={redirect}>
                <Card classes="justify-start items-center gap-2" >
                    <div className="bg-purple-500 rounded-full p-5"></div>
                    <TitleTag.Sub>AAAAAA</TitleTag.Sub>
                    <TitleTag.Normal style="text-gray-500">@userdsdasd</TitleTag.Normal>
                    <TitleTag.Normal style="text-gray-500">- 9h</TitleTag.Normal>
                </Card>

                <TitleTag.Parag style="break-words text-left ml-10 mb-4">{body}</TitleTag.Parag>

                <ReactionsTemplate props={{ likes: 10, deslikes: 20, shares: 20 }} />
            </Card>
        </>

    )
}