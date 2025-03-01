import LateralMenu from "../templates/LateralMenu";
import Groups from "../templates/Groups";
import { Outlet, useNavigate } from "react-router-dom";
import TitleTag from "../components/TitleTags";
import { FakeFriends } from "../hooks/useFakeData";
import { GuestFooterAdvice } from "../templates/GuestFooterAdvice";
import { useEffect, useState } from "react";
import { AuthProvider } from "../contexts/userContext";
import SearchBarTemplate from "../templates/SearchBar";

export default function FeedLayout() {

    const { logout, tipo_usuario, getUser } = AuthProvider()
    const [UserData, setUserData] = useState<any>([])

    const nav = useNavigate()

    const getData = async () => {
        if (window.localStorage.getItem("content") == "true") {
            const resp = await getUser()
            if (resp?.data)
                setUserData(resp.data.user)
        }
    }

    const handleLogout = () => {
        logout()
        nav("/")
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="flex flex-col w-full">
            <div className="flex bg-black dark:bg-black justify-center">

                <div className="sticky top-1 w-1/6 flex flex-col gap-10 px-2 overflow-auto h-[910px]">
                    <TitleTag.Main className="text-center">Televox</TitleTag.Main>
                    <LateralMenu username={UserData.username}/>
                    {tipo_usuario == "conta" && <p className="text-xl text-black dark:text-white text-center mt-6">Olá! {UserData.username}</p>}
                    {/* <DarkModeButton className="w-fit mx-auto py-2 px-4 rounded-3xl"/> */}
                    {tipo_usuario == "conta" && <button className="px-4 py-2 rounded-3xl text-black dark:text-white border hover:bg-gray-800 w-fit mx-auto mt-auto mb-2" onClick={handleLogout}>Logout</button>}
                </div>

                <div className="w-[600px] flex flex-col justify-start items-start gap-0 border-l  border-r min-h-[100vh]">
                    <Outlet />
                </div>

                <div className="sticky w-1/6 flex flex-col justify-start items-start px-4 gap-10 overflow-auto h-[910px] top-1 z-0">
                    <SearchBarTemplate />
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
            {tipo_usuario == "convidado" ? <GuestFooterAdvice setModal={undefined} modal={false} /> : ""}
        </div>

    )
}