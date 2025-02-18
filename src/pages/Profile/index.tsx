import { useEffect } from "react";
import ProfileTemplate from "../../templates/ProfileTemplate";
import { useParams, useLocation } from "react-router-dom";
import UsuarioInexistente from "../../templates/UsuarioInexistente";
import { useProfileMang } from "../../hooks/useProfileMang";

export default function ProfilePage() {

    const { username } = useParams()
    const location = useLocation()
    const { id } = location.state || {}
    const { getProfileData, getProfileData2, ProfileData, ProfilePostQTD, inx, loading, postsData } = useProfileMang()

 
    useEffect(() => {
        if (id) {
            getProfileData2(id)
        } else {
            getProfileData(username ?? "")
        }
    }, [])

    if (loading) {
        return <h1 className="text-center text-white text-3xl">CARREGANDO DADOS</h1>
    }

    if (inx) {
        return <UsuarioInexistente />
    }

    return (
        <ProfileTemplate feedData={postsData} background_url={ProfileData?.background_url ?? ""} data_criacao={ProfileData?.data_criacao ?? ""} data_nascimento={ProfileData?.data_nascimento ?? ""}
            genero={ProfileData?.genero ?? ""} id={ProfileData?.id ?? -1} img_url={ProfileData?.img_url ?? ""} nome={ProfileData?.nome ?? ""} username={ProfileData?.username ?? ""}
            quantidadePosts={ProfilePostQTD} loggedUsername={username} />
    )
}