import Card from "../../components/Card"
import TitleTag from "../../components/TitleTags"

type props = {
    profileData: any
    FollowList: any
    FollowType: string
}

export default function FollowListTemplate(props: props) {

    const { FollowList, FollowType, profileData } = props

    return (
        <div>
            <div className="sticky top-0 dark:bg-black bg-white bg-white/50 dark:text-white text-black w-full pl-8 z-20 p-2 dark:bg-black/50 backdrop-blur-[10px]">
                <h2 className="text-lg font-semibold">{profileData.nome}</h2>
                <h3 className="text-gray-500 text-xs">{profileData.username} posts</h3>
            </div>

            <div>
                {FollowList.map((index, value : any) => (
                    <Card className="flex-col hover:bg-gray-100 dark:hover:bg-gray-900 hover:cursor-pointer p-4 border-b" >
                        <Card className="justify-start items-center gap-2" >
                            <div className="rounded-full h-[40px] w-[40px] bg-purple-500 ">
                                {value.img_url ? <div className="w-full h-full rounded-full bg-red-500 m-2"></div> : <img src={value.img_url} className="h-full w-full rounded-full object-cover"></img>}
                            </div>
                            <TitleTag.Sub>{value.nome}</TitleTag.Sub>
                            <TitleTag.Normal style="text-gray-500">@{value.username}</TitleTag.Normal>
                           
                        </Card>
                     
                    </Card>
                ))}
            </div>
        </div>
    )
}