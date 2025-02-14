import FeedList from "../Feed"
import CreatePostCard from "../CreatePostCard"
import { PiCarDuotone } from "react-icons/pi"
import Card from "../../components/Card"
import { ProfileTemplateProps } from "../ProfileTemplate"

export default function FeedTemplate(props : ProfileTemplateProps) {

    const { username, feedData, img_url, nome} = props

    return (
        <Card className="flex-col w-full gap-4 justify-start items-start rounded-md">

            <CreatePostCard />

            <div className=" border-b w-full"></div>

            <FeedList data={feedData} img_url={img_url} name={nome} username={username} />

        </Card>
    )
}