import { useEffect } from "react";
import { useProfileMang } from "../../hooks/useProfileMang";
import FeedTemplate from "../../templates/FeedTemplate";
import { useAuth } from "../../contexts/userContext";
import UsuarioInexistente from "../../templates/UsuarioInexistente";

const ProfileAvatarUrl = "https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png"

export default function Home() {

    const { usuario_nome, usuario_ID, getUserData, loading, userData, userPostData } = useAuth()

    if (loading || usuario_ID && usuario_ID < 0 && !userPostData) {
        return <h1 className="text-center text-white text-3xl">CARREGANDO DADOS</h1>
    }

    return (
        <FeedTemplate data_criacao={""} data_nascimento={""} genero={""} id={0} img_url={ProfileAvatarUrl} background_url={""} nome={userData?.nome ?? ""} username={usuario_nome} feedData={userPostData}/>
    )

}