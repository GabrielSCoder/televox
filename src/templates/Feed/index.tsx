import axios from "axios"
import { useState, useEffect } from "react"
import { API_URL } from "../../utils/api"
import PostCard from "../PostCard"

export default function FeedList() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const getData = async () => {

        setLoading(true)

        const resp = await axios.get(API_URL + "posts/")

        if (resp.status == 200) {
            const dt = resp.data
            console.log(typeof (dt))

            const lmtdt = dt.slice(0, 20)
            setData(lmtdt)
        } else {
            console.log("deu ruim")
        }

        setLoading(false)
    }

    const makeCards = () => {

        const cards = data.map((key, index) => (
            <PostCard key={index} title={"Flemis2024"} body={key.body} deslieks={0} likes={20} shares={9} />
        ))

        return cards
    }

    const makeFakeCards = () => {

         const cards = Array.from({ length: 10 }, (_, index) => (
            <PostCard key={index} title={"Flemis2024"} body={"DSAJKDJASLDKJASLDJALJ"} deslieks={0} likes={20} shares={9} />
        ))

        return cards
    }


    useEffect(() => {
        // getData()
    }, [])

    if (loading) {
        return (
            <h2 className="font-bold text-xl text-white text-center">Loading...</h2>
        )
    }

    return (
        <div className="flex flex-col h-full w-full">
            {makeFakeCards()}
        </div>
    )
}
