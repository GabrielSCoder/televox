import FeedList from "../../components/Feed"
import ProfileCard from "../../components/ProfileCard"

export default function ProfileTemplate() {
    
    return (
        <>
            <div className="sticky top-0 bg-black text-white w-full pl-8 z-20 p-2 bg-black/50 backdrop-blur-[10px]">
                <h2 className="text-lg font-semibold text-white ">UserFlemis</h2>
                <h3 className="text-gray-500 text-xs">19 posts</h3>
            </div>

            <ProfileCard />
            <FeedList />

        </>

    )
}