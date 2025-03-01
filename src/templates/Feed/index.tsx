import { useState, useEffect } from "react"
import PostCard from "../PostCard"
import LoadingItemTemplate from "../LoadingItem"

type liksList = {
    liked : boolean
    total_reactions : string
}

type props = {
    data: Array<any>
    handleReaction : any
    likesList : Array<liksList>
    userId : number
}

export default function FeedList(props: props) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(props.data)


    const makeCards = () => {

        const cards = data.map((key: { id : number, conteudo: string, usuario : {username : string, img_url : string, nome : string}, usuario_id : number, total_reactions : string, liked : boolean }, index ) => (
            <PostCard key={index} title={"Flemis2024"} body={key.conteudo} likes={parseInt(props.likesList[index].total_reactions, 10)} user={key.usuario.nome}
             username={key.usuario.username} img_url={key.usuario.img_url} liked={props.likesList[index].liked} handleReaction={props.handleReaction} postId={key.id}
             lockedReact={!props.userId || props.userId == key.usuario_id}
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
        <div className="flex flex-col h-full w-full ">
            {/* <MakeFakeCards /> */}
            {makeCards()}
    
        </div>
    )
}
