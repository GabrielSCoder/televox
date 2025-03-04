import { useLocation, useNavigate } from "react-router-dom"
import Card from "../../components/Card"
import TitleTag from "../../components/TitleTags"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "../../components/Button"

type props = {
    profileData: any
    followingList: any
    followType: string
    followerList: any
    userData: any
    handleFollow: Function
    handleUnfollow: Function
}

export default function FollowListTemplate(props: props) {

    const { followingList, followerList, followType, profileData, userData, handleFollow, handleUnfollow } = props

    console.log(profileData)

    const location = useLocation()
    const raw = location.pathname.split("/")
    const nav = useNavigate()

    const f1Url = `/${raw[1]}/following`
    const f2Url = `/${raw[1]}/followers`

    var data

    if (followType == "followers") {
        data = followerList.dados.List.map((value: { usuario_seguidores: any; usuario_seguidor: any; }) => {
            const user = { ...value, usuario: value.usuario_seguidor ? value.usuario_seguidor : value.usuario_seguidores }
            return user
        })
    } else {
        data = followingList.dados.List.map((value: { usuario_seguidores: any; usuario_seguidor: any; }) => {
            const user = { ...value, usuario: value.usuario_seguidor ? value.usuario_seguidor : value.usuario_seguidores }
            return user
        })
    }

    const handleBtn = (relacao : {seguido: boolean, seguindo: boolean}, profileID ?: number, invert ?: boolean, pfTotalizer?: boolean) => {
        if (relacao.seguido && relacao.seguindo || relacao.seguindo) {
            handleUnfollow({ follower_id: userData.id, following_id: profileID, invertTotalizer : invert ? true : false, profileId : profileData.id, returnProfileTotalizer : pfTotalizer ?? false})
        } else {
            handleFollow({ follower_id: userData.id, following_id: profileID, invertTotalizer : invert ? true : false, profileId : profileData.id, returnProfileTotalizer : pfTotalizer ?? false})
        }
    }

    const BtnManager = (data: {relacao : {seguido: boolean, seguindo: boolean}, choosedProfile : number }) => {

        const {relacao, choosedProfile} = data

        if (userData.username == profileData.username) {
            if (followType == "following") {
                return (
                    <div>
                        <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-base hover:bg-slate-200"
                            text={"deixar de seguir"} onClick={() => handleUnfollow({ follower_id: userData.id, following_id: choosedProfile, profileId : profileData.id })}
                        />
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-base hover:bg-slate-200"
                            text={relacao.seguido && relacao.seguindo ? "deixar de seguir" : "seguir de volta"} onClick={() => handleBtn(relacao, choosedProfile, false )}
                        />
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-base hover:bg-slate-200"
                        text={relacao.seguido && relacao.seguindo || !relacao.seguido && relacao.seguindo ? "deixar de seguir" : relacao.seguido && !relacao.seguindo ? "seguir de volta" : "seguir"} onClick={() => handleBtn(relacao, choosedProfile, true, true)}
                    />
                </div>
            )
        }
    }



    return (
        <div className="w-full">
            <div className="sticky top-0 dark:bg-black bg-white bg-white/50 dark:text-white text-black w-full z-20 p-2 dark:bg-black/50 backdrop-blur-[10px] flex flex-col gap-4 border-b">
                <div className="flex items-center gap-4 pl-2">
                    <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-500 hover:cursor-pointer" onClick={() => nav(`/${raw[1]}`)}>
                        <IoMdArrowRoundBack className="text-white" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{profileData.nome}</h2>
                        <h3 className="text-gray-500 text-sm">@{profileData.username}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 w-full text-center items-center h-[60px]">
                    <div className="hover:bg-gray-900 hover:cursor-pointer h-full flex items-center justify-center" onClick={followType != "following" ? () => nav(f1Url) : () => ""}>
                        <h4 className="text-gray-600 ">Seguindo</h4>
                    </div>
                    <div className="hover:bg-gray-900 hover:cursor-pointer h-full flex items-center justify-center" onClick={followType != "followers" ? () => nav(f2Url) : () => ""}>
                        <h4 className="text-gray-600">Seguidores</h4>
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-full">
                {data.map((value: any, index: number) => (
                    <Card key={index} className="flex-col hover:bg-gray-100 dark:hover:bg-gray-900 hover:cursor-pointer p-4 h-[90px]" >
                        <Card className="items-center justify-between" >
                            <div className="flex items-center gap-4">
                                <div className="rounded-full h-[40px] w-[40px] bg-purple-500 ">
                                    {!value?.img_url ? <div className="w-full h-full rounded-full  m-2"></div> : <img src={value.img_url} className="h-full w-full rounded-full object-cover"></img>}
                                </div>
                                <div className="flex flex-col">
                                    <TitleTag.Sub className="hover:underline hover:decoration-white" onClick={() => nav("/" + value.username)}>{value.nome}</TitleTag.Sub>
                                    <TitleTag.Normal className="text-gray-500">@{value.username}</TitleTag.Normal>
                                </div>
                            </div>

                            {value.id != userData.id ? (<BtnManager key={index}  relacao={value.relacao} choosedProfile={value.id}/>) : ""}
                        </Card>

                    </Card>
                ))}
            </div>
        </div>
    )
}