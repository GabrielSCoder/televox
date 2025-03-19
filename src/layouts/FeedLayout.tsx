import LateralMenu from "../templates/LateralMenu";
import { Outlet } from "react-router-dom";
import TitleTag from "../components/TitleTags";
import { GuestFooterAdvice } from "../templates/GuestFooterAdvice";
import { useEffect, useState } from "react";
import { AuthProvider } from "../hooks/useAuth";
import SearchBarTemplate from "../templates/SearchBar";
import LoadingPageTemplate from "../templates/LoadingPage";
import classNames from "../utils/classNames";
import { getNotificationsbyId } from "../services/notification";
import { socket } from "../services/socket";
import HorizontalMenu from "../templates/HorizontalMenu";

export default function FeedLayout() {

    const { logout, tipo_usuario, getUser, authLoading } = AuthProvider()

    const [UserData, setUserData] = useState<any>([])
    const [notifications, setNotifications] = useState(0)
    const [menuopen, setMenuOpen] = useState(false)

    const getData = async () => {
        if (window.localStorage.getItem("profile")) {
            const resp = await getUser()
            if (resp?.data) {
                setUserData(resp.data.user)
                await getNotify(resp.data.user.id)
            }
        }
    }

    const getNotify = async (id: number) => {
        const resp = await getNotificationsbyId(id)
        if (resp.data.success) {

            const n = resp.data.dados.filter((value: any) => value.visualizado === false).length;
            setNotifications(n)

        }
    }

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        socket.on("notifyResponse", (data) => {
            console.log("----REtorno de notificação")
            console.log(data)
            if (UserData.id == data.usuario_destino)
                setNotifications(data.notificacoes)
        })

        return () => {
            socket.off("notifyResponse")
        }
    })

    useEffect(() => {
        getData()
    }, [])


    if (authLoading || UserData.id == undefined) {
        return <LoadingPageTemplate className="w-full h-screen" />
    }

    return (
        <div className="flex flex-col w-full">
            <div className="relative flex-col lg:flex lg:flex-row bg-black dark:bg-black justify-center">

                <div className={classNames("hidden sticky top-1 w-[250px] lg:flex lg:flex-col gap-10 px-2 overflow-auto h-[910px] ", tipo_usuario == "conta" ? "xl:h-[99vh] lg:h-[99vh]" : "lg:h-[800px]")}>
                    <TitleTag.Main className="text-left px-2">Webvox</TitleTag.Main>
                    <LateralMenu username={UserData.username} id={UserData.id} notificationsNumber={notifications} />
                    {/* {tipo_usuario == "conta" && <p className="text-xl text-black dark:text-white text-center mt-6">Olá! {UserData.username}</p>} */}
                    {/* <DarkModeButton className="w-fit mx-auto py-2 px-4 rounded-3xl"/> */}
                    {tipo_usuario == "conta" && <button className="px-4 py-2 rounded-3xl text-black dark:text-white border hover:bg-gray-800 w-fit mt-auto mb-2" onClick={handleLogout}>Logout</button>}
                </div>

                <div className="sticky h-[56px] top-0 lg:hidden z-20 bg-black flex items-center p-2 dark:bg-black/50 backdrop-blur-[10px]">
                    <div className="rounded-full h-[40px] w-[40px] bg-black" onClick={() => setMenuOpen(!menuopen)}>
                        {!UserData.img_url ? <div className="w-full h-full rounded-full bg-red-500 m-2"></div> : <img src={UserData.img_url} className="h-full w-full rounded-full object-cover"></img>}
                    </div>
                    <h2 className="text-center text-xl text-white ml-[130px] md:mx-auto">WebVox</h2>
                    <div className={classNames("absolute top-14 left-0 lg:hidden", !menuopen ? "hidden" : "")}>
                        <div className="absolute top-0 left-0 z-20 px-2">
                            <SearchBarTemplate />
                        </div>
                        <LateralMenu username={UserData.username} id={UserData.id} notificationsNumber={notifications}
                            className={classNames("h-[350px] bg-black justify-center relative ")} />
                        <button className="absolute top-[300px] left-10 px-4 py-2 rounded-3xl text-black dark:text-white border hover:bg-gray-800 w-fit mb-2" onClick={handleLogout}>Logout</button>
                    </div>

                </div>

                <div className="w-full lg:w-[600px] flex flex-col justify-start items-start gap-0 border-l  border-r min-h-[100vh]">
                    <Outlet />
                </div>

                <div className="sticky h-[56px] bottom-0 lg:hidden z-20 bg-black dark:bg-black/50 backdrop-blur-[10px]">
                    <HorizontalMenu username={UserData.username} id={UserData.id} notificationsNumber={notifications} className="h-full w-full items-center justify-between px-10" />
                </div>

                <div className={classNames("hidden sticky w-1/6 lg:flex lg:flex-col justify-start items-start px-4 gap-10 overflow-auto top-1 z-0", tipo_usuario == "conta" ? "xl:h-[99vh] lg:h-[99vh]" : "lg:h-[800px]")}>
                    <SearchBarTemplate />
                    {/* <AlertConnection /> */}
                    {/* {tipo_usuario == "conta" ? (
                        <>
                            <div className="flex flex-col border border-gray-700 w-full p-4 rounded-md gap-2">
                                <h2 className="text-white text-xl font-semibold text-center">Following</h2>
                                <FakeFriends />
                            </div>
                            <Groups />
                        </>
                    ) : ""} */}

                </div>


            </div>
            {tipo_usuario == "convidado" ? <GuestFooterAdvice /> : ""}
        </div>

    )
}