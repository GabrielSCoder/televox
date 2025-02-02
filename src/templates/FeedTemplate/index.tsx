import FeedList from "../Feed"
import CreatePostCard from "../CreatePostCard"
import { PiCarDuotone } from "react-icons/pi"
import Card from "../../components/Card"

export default function FeedTemplate() {

    return (
        <Card classes="flex-col w-full gap-4 justify-start items-start rounded-md">

            <CreatePostCard />

            <div className=" border-b w-full"></div>

            <FeedList />

        </Card>
    )
}