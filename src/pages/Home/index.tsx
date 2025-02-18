import { useEffect, useState } from "react";
import { useProfileMang } from "../../hooks/useProfileMang";
import FeedTemplate from "../../templates/FeedTemplate";
import { useAuth } from "../../contexts/userContext";
import UsuarioInexistente from "../../templates/UsuarioInexistente";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { getFeedMk1 } from "../../services/post";

const ProfileAvatarUrl = "https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png"

export default function Home() {

    const { userData, getToken } = useAuth()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const resp = await getFeedMk1(getToken(), {id : 21, numeroPagina : 0, tamanhoPagina : 10} )
        if (resp.data.success) {
            console.log(resp)
            setData(resp.data.dados)
        }
        setLoading(false)
    }

    
    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return <LoadingPageTemplate />
    }

    return (
        <FeedTemplate img_url={userData.img_url} nome={userData.nome} username={userData.username} feedData={data}/>
    )

}