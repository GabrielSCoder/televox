import LateralMenu from "../templates/LateralMenu";
import Groups from "../templates/Groups";
import { Outlet } from "react-router-dom";
import { Title } from "../components/Inputs";
import TitleTag from "../components/TitleTags";
import DarkModeButton from "../templates/DarkModeButtonTemplate";


export default function FeedLayout() {

    const fakeFriends = () => {

        let ff = []
        let temp

        for (let i = 0; i < 5; i++) {
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
        <div className="flex bg-white dark:bg-black justify-center">

            <div className="sticky top-1 w-1/6 flex flex-col gap-10 px-2 overflow-auto h-[600px]">
                {/* <h1 className="text-2xl font-bold text-white text-center">TeleVox</h1> */}
                <TitleTag.Main style="text-center">Televox</TitleTag.Main>
                <LateralMenu />
                <DarkModeButton />
            </div>

            <div className="w-1/3 flex flex-col justify-start items-start gap-0 border-l  border-r ">
                <Outlet />
            </div>

            <div className="sticky w-1/6 flex flex-col justify-start items-start px-4 gap-10 overflow-auto h-[1000px] top-1 ">
                <input type="text" placeholder="Search" className="rounded-3xl border border-gray-700 text-white bg-black px-3 py-2 w-full" />
                <div className="flex flex-col border border-gray-700 w-full p-4 rounded-md gap-2">
                    <h2 className="text-white text-xl font-semibold text-center">Following</h2>
                    {fakeFriends()}
                </div>
                <Groups />
            </div>

        </div>
    )
}