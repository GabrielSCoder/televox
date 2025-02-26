import axios from "axios"
import { useState, useEffect, Key } from "react"
import { API_URL } from "../../utils/api"
import PostCard from "../PostCard"
import { MakeFakeCards } from "../../hooks/useFakeData"
import LoadingItemTemplate from "../LoadingItem"

type props = {
    data: any
}

export default function FeedList(props: props) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(props.data)

    const makeCards = () => {

        const cards = data.map((key: { conteudo: string, usuario : any }, index: Key | null | undefined) => (
            <PostCard key={index} title={"Flemis2024"} body={key.conteudo} deslieks={0} likes={20} shares={9} user={key.usuario.nome} username={key.usuario.username} img_url={key.usuario.img_url}/>
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
        <div className="flex flex-col h-full w-full">
            {/* <MakeFakeCards /> */}
            {makeCards()}
    
        </div>
    )
}
