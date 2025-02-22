import { useEffect, useState } from "react";
import ProfileTemplate from "../../templates/ProfileTemplate";
import { useParams, useLocation } from "react-router-dom";
import UsuarioInexistente from "../../templates/UsuarioInexistente";
import { useProfileMang } from "../../hooks/useProfileMang";
import { useAuth } from "../../contexts/userContext";
import LoadingPageTemplate from "../../templates/LoadingPage";
import useDebounce from "../../hooks/useDebounce";

export default function ProfilePage() {

    const { username } = useParams()
    const location = useLocation()
    const { id } = location.state || {}

    const { getProfileData, inx, Profileloading, ProfileData, postsData, ProfilePostQTD, isFollowing, followers, following, handleUnfollow, handleFollow } = useProfileMang()
    const {loading, userData } = useAuth()

    const getData = async () => {
        await getProfileData(username ?? "")
    }

    useEffect(() => {
        getData()
    }, [])
    

    if (loading || Profileloading ) {
        return <LoadingPageTemplate />
    }

    if (inx) {
        return <UsuarioInexistente />
    }

    return (
        <ProfileTemplate userData={userData} profileData={ProfileData} postData={postsData} handleFollow={handleFollow}
         handleUnfollow={handleUnfollow} ProfilePostQTD={ProfilePostQTD} isFollowing={isFollowing} followers={followers} following={following}/>
    )
}