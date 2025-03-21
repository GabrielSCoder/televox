import FeedList from "../Feed"
import ProfileCard from "../ProfileCard"
import ProfileWithoutPosts from "../ProfileWithoutPosts"

// const tst = {
//     profileName: "gabriel",
//     postValue: 10,
//     accountUser: "@sjsjsjs",
//     meetText: "Olá",
//     createDate: "92038-2012",
//     followingValue: 10,
//     followersValue: 21,
//     backgroundUrl: "https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MjAwMDEyMjE2ODQ4NjIyNzAw/25-fun-things-to-do-at-the-beach.jpg",
//     ProfileAvatarUrl: "https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png"
// }

export type ProfileTemplateProps = {
    profileData : any
    userData ?: any
    postData : any
    ProfilePostQTD : any
    followSituation : number
    handleFollow : any
    handleUnfollow : any
    handleReaction : any
    followers : number
    following : number
    likesList : any
    setState : any
    state : boolean
}

export default function ProfileTemplate(props : ProfileTemplateProps) {

    
    const { postData, ProfilePostQTD, profileData, userData, followSituation, handleFollow, handleUnfollow, followers, following , likesList, setState, state} = props

    return (
        <>
            <div className="lg:sticky lg:top-0 dark:bg-black bg-white bg-white/50 dark:text-white text-black w-full pl-8 lg:z-20 p-2 dark:bg-black/50 lg:backdrop-blur-[10px]">
                <h2 className="text-lg font-semibold">{profileData.nome}</h2>
                <h3 className="text-gray-500 text-xs">{ProfilePostQTD} posts</h3>
            </div>

            <ProfileCard profileData={profileData} userData={userData} followSituation={followSituation} handleFollow={handleFollow} handleUnfollow={handleUnfollow}
             followers={followers} following={following} profileModal={state} setProfileModal={setState}/>

            
            {postData.length > 0 ? (
                <FeedList data={postData} handleReaction={props.handleReaction} likesList={likesList} userId={userData.id ?? 0}/>
            ) : (
                <ProfileWithoutPosts />
            )}
            

        </>

    )
}