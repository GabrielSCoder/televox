import { Outlet, useNavigate } from "react-router-dom";
// import DarkModeButton from "../templates/DarkModeButtonTemplate";

export default function HomeLayout() {

    const nav = useNavigate()

    return (
        <div className="dark:bg-black h-screen bg-white flex-col ">

            <div className="flex h-[94vh] p-2">
                {/* <DarkModeButton className="absolute top-1 left-1" /> */}

                <div className="flex justify-center items-center w-full">
                    <h1 className="text-8xl font-bold dark:text-white text-black">WEBVOX</h1>
                </div>

                <div className="w-[80vw] flex justify-start items-center p-4">
                    <Outlet />
                </div>
            </div>

            <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
                <div className="flex gap-6">
                    <h4 className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/sobre")}>Sobre</h4>
                    <a className="text-sm text-gray-500">Quem sou</a>
                </div>
                <h2 className="text-center text-base text-gray-500">2025 Gabriel Sena </h2>
            </div>
        </div>
    )
}

