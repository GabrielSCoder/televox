import LateralMenu from "../templates/LateralMenu";
import Groups from "../templates/Groups";
import { Outlet, useNavigate } from "react-router-dom";
import TitleTag from "../components/TitleTags";
import DarkModeButton from "../templates/DarkModeButtonTemplate";
import { useAuth } from "../contexts/userContext";
import { useState } from "react";
import { FakeFriends } from "../hooks/useFakeData";
import LoadingPageTemplate from "../templates/LoadingPage";


export default function FeedLayout() {

    const { usuario_ID, logout, userData, tipo_usuario } = useAuth()
    const nav = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleLogout = () => {
        logout()
        nav("/")
    }

    if (loading) {
        
        return (
            <LoadingPageTemplate />
        )
    }

    return (
        <div className="flex bg-black dark:bg-black justify-center">

            <div className="sticky top-1 w-1/6 flex flex-col gap-10 px-2 overflow-auto h-[920px]">
                <TitleTag.Main style="text-center">Televox</TitleTag.Main>
                <LateralMenu />
                {tipo_usuario == "conta" && <p className="text-xl text-black dark:text-white text-center mt-6">Olá! {userData.username}</p>}
                {/* <DarkModeButton className="w-fit mx-auto py-2 px-4 rounded-3xl"/> */}
                {tipo_usuario == "conta" && <button className="px-4 py-2 rounded-3xl text-black dark:text-white bg-gray-400 w-fit mx-auto mt-auto mb-2" onClick={handleLogout}>Logout</button>}
            </div>

            <div className="w-[600px] flex flex-col justify-start items-start gap-0 border-l  border-r">
                <Outlet />
            </div>

            <div className="sticky w-1/6 flex flex-col justify-start items-start px-4 gap-10 overflow-auto h-[920px] top-1 ">
                <input type="text" placeholder="Search" className="rounded-3xl border border-gray-700 text-white bg-black px-3 py-2 w-full" />
                {tipo_usuario == "conta" ? (
                    <>
                        <div className="flex flex-col border border-gray-700 w-full p-4 rounded-md gap-2">
                            <h2 className="text-white text-xl font-semibold text-center">Following</h2>
                            <FakeFriends />
                        </div><Groups />
                    </>
                ) : ""}

            </div>

        </div>
    )
}