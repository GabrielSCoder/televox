import { useEffect, useState } from "react";
import FeedTemplate from "../../templates/FeedTemplate";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { getFeedMk1, getFeedMk2 } from "../../services/post";
import { AuthProvider } from "../../hooks/useAuth";
import { liksList } from "../../types/postType";
import useDebounce from "../../hooks/useDebounce";


export default function Home() {

    const [feedData, setFeedData] = useState([])
    const [userData, setUserData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [likesList, setLikesList] = useState<liksList[]>([])
    const { getUser, tipo_usuario } = AuthProvider()

    const getDataWithUser = async () => {
        setLoading(true);
        const handle = await getUser();
    
        if (handle?.data) {
            setUserData(handle.data.user);
            await new Promise((resolve) => setTimeout(resolve, 0)); 
        }
    
        const resp = await getFeedMk2({ id: handle?.data.user.id, numeroPagina: 0, tamanhoPagina: 15, profile_id: handle?.data.user.id });
    
        if (resp.data.success) {
            setFeedData(resp.data.dados);
            const lkList = resp.data.dados.map((value: { id: number, liked: any; total_reactions: any, total_replies: any }) => {
                return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies: value.total_replies };
            });
    
            setLikesList(lkList);
        }
    
        setLoading(false);
    };
    

    const getDataWoutUser = async () => {

        setLoading(true)
    
        const resp = await getFeedMk1({ id: 0, tamanhoPagina: 15, numeroPagina : 0})
        if (resp.data.success) {
            setFeedData(resp.data.dados)
           
            const lkList = resp.data.dados.map((value: { id: number, liked: any; total_reactions: any, total_replies : any }) => {
                return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies : value.total_replies }
            })
           
            setLikesList(lkList)
        }
        setLoading(false)
    }

    const handleReaction = (data: { post_id: number, usuario_id: number, profile_id : number }) => {
        console.log("react", data)
    }

    const debounceReact = (post_id: number, profile_id : number) => {
        const xData = { post_id: post_id, usuario_id: userData.id, profile_id : profile_id }
        
        handleReaction(xData)
    }

    // const updateLikes = (data : any) => {

    

    //     setLikesList((prev) =>
    //         prev.map((post) =>
    //             post.id === data.data.post_id
    //                 ? { ...post, liked: data.data.usuario_id == userData.id ? data.liked.liked : post.liked, total_reactions: data.total.total_reactions }
    //                 : post
    //         )
    //     );
    // }

    const debounceHandlerFollow = useDebounce(debounceReact, 200)

    useEffect(() => {
      
        
        tipo_usuario === "convidado" ? getDataWoutUser() : getDataWithUser();
    
  
    }, []); 
    
    useEffect(() => {
        if (!userData || !userData.id) return;
           
    }, [userData]);

    if (loading || userData.id == undefined) {
        return <LoadingPageTemplate  className="w-full h-full"/>
    }

    return (
        <FeedTemplate feedData={feedData} userData={userData} likesList={likesList} HandleReact={debounceHandlerFollow}/>
    )

}