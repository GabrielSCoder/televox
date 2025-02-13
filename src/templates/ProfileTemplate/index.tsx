import { profile } from "../../types/profileType"
import FeedList from "../Feed"
import ProfileCard from "../ProfileCard"

const tst = {
    profileName: "gabriel",
    postValue: 10,
    accountUser: "@sjsjsjs",
    meetText: "Olá",
    createDate: "92038-2012",
    followingValue: 10,
    followersValue: 21,
    backgroundUrl: "https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MjAwMDEyMjE2ODQ4NjIyNzAw/25-fun-things-to-do-at-the-beach.jpg",
    ProfileAvatarUrl: "https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png"
}

export type ProfileTemplateProps = {
    feedData ?: any
    quantidadePosts? : number
    loggedUsername? : string
} & profile

export default function ProfileTemplate(props : ProfileTemplateProps) {

    const {background_url, data_criacao, data_nascimento, genero, id, img_url, nome, username, feedData, quantidadePosts, loggedUsername } = props
    
    return (
        <>
            <div className="sticky top-0 dark:bg-black bg-white bg-white/50 dark:text-white text-black w-full pl-8 z-20 p-2 dark:bg-black/50 backdrop-blur-[10px]">
                <h2 className="text-lg font-semibold">{nome}</h2>
                <h3 className="text-gray-500 text-xs">{quantidadePosts} posts</h3>
            </div>

            <ProfileCard  data_criacao={data_criacao} data_nascimento={data_nascimento} genero="" id={id} img_url={tst.ProfileAvatarUrl} nome={nome} username={username} 
            background_url={tst.backgroundUrl} loggedUsername={loggedUsername ?? ""}/>
            
            <FeedList data={feedData} name={nome} username={username} img_url={tst.ProfileAvatarUrl}/>

        </>

    )
}