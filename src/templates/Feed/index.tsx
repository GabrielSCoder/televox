import axios from "axios"
import { useState, useEffect, Key } from "react"
import { API_URL } from "../../utils/api"
import PostCard from "../PostCard"
import { MakeFakeCards } from "../../hooks/useFakeData"
import LoadingItemTemplate from "../LoadingItem"

type props = {
    data: any
    handleReaction : any
}

export default function FeedList(props: props) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(props.data)

    const makeCards = () => {

        const cards = data.map((key: { id : number, conteudo: string, usuario : any, total_reactions : string, liked : boolean }, index: Key | null | undefined) => (
            <PostCard key={index} title={"Flemis2024"} body={key.conteudo} likes={parseInt(key.total_reactions, 10)} user={key.usuario.nome}
             username={key.usuario.username} img_url={key.usuario.img_url} liked={key.liked} handleReaction={props.handleReaction} postId={key.id} />
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
