import { Outlet } from "react-router-dom";
import DarkModeButton from "../templates/DarkModeButtonTemplate";

export default function HomeLayout() {
    return (
        <div className="dark:bg-black flex h-screen p-2 bg-white">

            <DarkModeButton className="absolute top-1 left-1"/>

            <div className="flex justify-center items-center w-full">
                <h1 className="text-8xl font-bold dark:text-white text-black">TELEVOX</h1>
            </div>

            <div className=" w-[80vw] flex justify-start items-center p-4">
                <Outlet />
            </div>
        </div>
    )
}