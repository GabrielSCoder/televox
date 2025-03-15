import { useState, useEffect } from "react"
import PostCard from "../PostCard"
import LoadingItemTemplate from "../LoadingItem"

type liksList = {
    liked : boolean
    total_reactions : number
    total_replies : number
}

type props = {
    data: Array<any>
    handleReaction : any
    likesList : Array<liksList>
    userId : number
}

export default function FeedList(props: props) {

    const [loading, setLoading] = useState(true)
    const data = props.data 

    const makeCards = () => {

        const cards = data.map((key: { id : number, conteudo: string, data_criacao : string, usuario : {id : number, username : string, img_url : string, nome : string}, usuario_id : number, total_reactions : string, liked : boolean }, index ) => (
            <PostCard key={index} title={"Flemis2024"} body={key.conteudo} likes={props.likesList[index].total_reactions} user={key.usuario.nome}
             username={key.usuario.username} img_url={key.usuario.img_url} liked={props.likesList[index].liked} handleReaction={props.handleReaction} postId={key.id}
             lockedReact={!props.userId || props.userId == key.usuario_id} replies={props.likesList[index].total_replies} data_criacao={key.data_criacao} profileId={key.usuario.id}
             />
        ))

        return cards
    }

    useEffect(() => {
        setLoading(false)
    }, [data])

    if (loading) {
        return (
            <LoadingItemTemplate />
        )
    }

    return (
        <div className="flex flex-col w-full ">
            {/* <MakeFakeCards /> */}
            {makeCards()}
    
        </div>
    )
}
