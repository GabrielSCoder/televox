import axios from "axios"
import { useState, useEffect, Key } from "react"
import { API_URL } from "../../utils/api"
import PostCard from "../PostCard"
import { MakeFakeCards } from "../../hooks/useFakeData"

type props = {
    data: any
    username : string
    name : string
    img_url : string
}

export default function FeedList(props: props) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(props.data)

    const makeCards = () => {

        const cards = data.map((key: { conteudo: string }, index: Key | null | undefined) => (
            <PostCard key={index} title={"Flemis2024"} body={key.conteudo} deslieks={0} likes={20} shares={9} user={props.name} username={props.username} img_url={props.img_url}/>
        ))

        return cards
    }

    useEffect(() => {
        setLoading(false)
    }, [data.lenght])

    if (loading) {
        return (
            <h2 className="font-bold text-xl text-white text-center">Loading...</h2>
        )
    }

    return (
        <div className="flex flex-col h-full w-full">
            {/* <MakeFakeCards /> */}
            {makeCards()}
        </div>
    )
}
