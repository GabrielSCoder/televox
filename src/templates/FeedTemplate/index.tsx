import FeedList from "../Feed"
import CreatePostCard from "../CreatePostCard"
import Card from "../../components/Card"

export default function FeedTemplate(props : {feedData: any, userData : any, likesList : any, HandleReact : any}) {

    const { feedData, userData, likesList, HandleReact} = props

    return (
        <Card className="flex-col w-full gap-4 justify-start items-start rounded-md">

            <CreatePostCard userData={userData}/>

            <div className=" border-b w-full"></div>

            <FeedList data={feedData} handleReaction={HandleReact} likesList={likesList} userId={userData.id} />

        </Card>
    )
}