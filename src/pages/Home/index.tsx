import { useEffect, useState } from "react";
import FeedTemplate from "../../templates/FeedTemplate";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { getFeedMk1 } from "../../services/post";
import { AuthProvider } from "../../contexts/userContext";

const ProfileAvatarUrl = "https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png"

export default function Home() {

    const [feedData, setFeedData] = useState([])
    const [userData, setUserData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const {getUser} = AuthProvider()
    

    const getData = async () => {
        setLoading(true)
        const handle = await getUser()
        const resp = await getFeedMk1({id : 21, numeroPagina : 0, tamanhoPagina : 10} )
        if (resp.data.success) {
            console.log(resp)
            setFeedData(resp.data.dados)
        }
        if (handle?.data) {
            setUserData(handle.data.user)
            console.log(handle.data.user)
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
        <FeedTemplate feedData={feedData} userData={userData}/>
    )

}