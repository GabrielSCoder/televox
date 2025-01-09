import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import TestMsg from "../pages/Test";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import PostCard from "../components/PostCard";
import LateralMenu from "../components/LateralMenu";
import Groups from "../components/Groups";
import ProfileCard from "../components/ProfileCard";




function FeedList() {

    const [loading, setLoading] = useState(true)
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
            <PostCard key={index} title={"user3490907"} body={key.body} deslieks={0} likes={20} shares={9} />
        ))

        return cards
    }

   
    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return (
            <h2 className="font-bold text-xl">Loading...</h2>
        )
    }

    return (
        // <button className="p-2 bg-blue-400 text-white" onClick={() => getData()}>Apply</button>
        // <p>{JSON.stringify(data)}</p>
        <div className="flex flex-col h-full overflow-y-auto">
            {makeCards()}
        </div>
    )
}

export default function FeedLayout() {

    const fakeFriends = () => {
        
        let ff = []
        let temp

        for (let i = 0; i < 10; i++) {
            temp = (
                <div className="flex gap-4">
                    <div className={`rounded-full p-4 bg-[#3738]`}></div>
                    <h2 className="text-white font-semibold text-lg">{`User18299${i}`}</h2>
                </div>
            )

            ff.push(temp)
        }

        return (
            <div className="flex flex-col gap-4">
                {ff}
            </div>
        )
    }


    return (
        <div className="flex h-screen bg-black mx-30">


            <div className="w-1/3 flex flex-col gap-10 p-2">
                <h1 className="text-2xl font-bold text-white text-center">TeleVox</h1>
                <LateralMenu />
            </div>

            <div className=" bg-black w-1/3 flex flex-col justify-start items-start p-2 overflow-hidden gap-2 border-l border-gray-700 border-r">
                {/* <TestMsg /> */}
                <ProfileCard />
                <FeedList />
            </div>

            <div className=" w-1/3 flex flex-col justify-start items-start h-full p-2 gap-10 overflow-hidden">
                <input type="text" placeholder="Search" className="rounded-3xl border border-gray-700 text-white bg-black p-3 w-[500px]" />
                <div className="flex flex-col border border-gray-700 w-full p-4 rounded-md">
                    <h2 className="text-white text-xl font-semibold text-center">Following</h2>
                    {fakeFriends()}
                </div>
                <Groups />
            </div>

        </div>
    )
}