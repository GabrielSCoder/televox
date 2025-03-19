import { Outlet, useNavigate } from "react-router-dom";
// import DarkModeButton from "../templates/DarkModeButtonTemplate";

export default function HomeLayout() {

    const nav = useNavigate()

    return (
        <div className="dark:bg-black h-screen bg-white flex-col ">

            <div className="flex flex-col h-[94vh] p-2 lg:flex-row ">
                {/* <DarkModeButton className="absolute top-1 left-1" /> */}

                <div className="flex justify-center items-center w-full">
                    <h1 className="text-3xl md:text-8xl font-bold dark:text-white text-black hover:cursor-pointer" onClick={() => nav("/")}>WEBVOX</h1>
                </div>

                <div className="lg:w-[80vw] flex justify-center lg:justify-start items-center p-0 md:p-4 h-full w-full">
                    <Outlet />
                </div>
            </div>

            <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
                <div className="flex gap-6">
                    <h4 className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("sobre")}>Sobre</h4>
                    <a className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("sobremim")}>Quem sou</a>
                    <h4 className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("tecnologias")}>Tecnologias</h4>
                </div>
                <h2 className="text-center text-base text-gray-500">2025 Gabriel Sena </h2>
            </div>
        </div>
    )
}

