import FeedList from "../Feed"
import CreatePostCard from "../CreatePostCard"
import { PiCarDuotone } from "react-icons/pi"
import Card from "../../components/Card"
import { ProfileTemplateProps } from "../ProfileTemplate"

export default function FeedTemplate(props : {username: any, feedData: any, img_url: any, nome: any}) {

    const { username, feedData, img_url, nome} = props

    return (
        <Card className="flex-col w-full gap-4 justify-start items-start rounded-md">

            <CreatePostCard />

            <div className=" border-b w-full"></div>

            <FeedList data={feedData} />

        </Card>
    )
}