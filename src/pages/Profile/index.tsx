import { useEffect, useState } from "react";
import ProfileTemplate from "../../templates/ProfileTemplate";
import { useParams, useLocation } from "react-router-dom";
import UsuarioInexistente from "../../templates/UsuarioInexistente";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { AuthProvider } from "../../contexts/userContext";
import FollowListTemplate from "../../templates/FollowListTemplate";
import useProfileMang from "../../hooks/useProfileMang";
import useDebounce from "../../hooks/useDebounce";

export default function ProfilePage() {

    const { username } = useParams()
    const location = useLocation()
    const url = location.pathname.split('/')

    const { getProfileWithUser, getProfileWithoutUser, inx, Profileloading, ProfilePostQTD, ProfileData, postsData, followSituation, followers, following, followersData, followingData,
        handleUnfollow, handleFollow } = useProfileMang()
    const { getUser, tipo_usuario, authLoading } = AuthProvider()
    const [userData, setUserData] = useState<any>([])

    const userrr = async () => {
        const resp = await getUser()
        if (resp?.data) {
            setUserData(resp.data.user)
        }

        await getData(resp?.data.user)
    }

    const getData = async (loggedUser : any) => {
        tipo_usuario == "convidado" ?
            await getProfileWithoutUser(username ?? "") :
            await getProfileWithUser(username ?? "", loggedUser)
    }

    const debounceFollow = (data: any) => {
        handleFollow(data)
    }

    const debounceUnfollow = (data: any) => {
        handleUnfollow(data)
    }

    const debounceHandlerFollow = useDebounce(debounceFollow, 2000)
    const debounceHandlerUnfollow = useDebounce(debounceUnfollow, 2000)

    useEffect(() => {

        userrr()

    }, [username])

    if (Profileloading || authLoading) {
        return <LoadingPageTemplate />
    }

    if (url && url[2]) {
        return <FollowListTemplate followingList={followingData} followType={url[2]} profileData={ProfileData} followerList={followersData}
         userData={userData} handleFollow={debounceHandlerFollow} handleUnfollow={debounceHandlerUnfollow} />
    }


    if (inx) {
        return <UsuarioInexistente />
    }

    return (
        <ProfileTemplate userData={userData} profileData={ProfileData} postData={postsData} handleFollow={debounceHandlerFollow}
            handleUnfollow={debounceHandlerUnfollow} ProfilePostQTD={ProfilePostQTD} followSituation={followSituation} followers={followers} following={following}
        />
    )
}