import { useState } from "react";
import { useAuth } from "../../contexts/userContext";
import ProfileTemplate from "../../templates/ProfileTemplate";
import { useParams } from "react-router-dom";

export default function ProfilePage () {

    const { username } = useParams()
    const { usuario_ID, getToken} = useAuth()
    const [ProfileData, setProfileData] = useState([])
    console.log(username)

    return (
        <ProfileTemplate ProfileAvatarUrl={""} dataInicioConta={""} fotoUrl={""} nome={""} quantidadePosts={0} textoIntroducao={""} username={""} feedData={""}/>
    )
}