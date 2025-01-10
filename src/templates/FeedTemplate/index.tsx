import FeedList from "../../components/Feed"
import CreatePostCard from "../../components/CreatePostCard"

export default function FeedTemplate() {

    return (
        <div className="flex flex-col w-full gap-4 justify-start items-start p-4 bg-black rounded-md border border-gray-100 shadow-md">

            <CreatePostCard/>

             <FeedList />

        </div>
    )
}