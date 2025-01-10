import { useNavigate } from "react-router-dom"
import ProfileCard from "../ProfileCard"

function LateralMenu () {
    const opts = ["Home", "Notifications" , "Groups", "Messages", "Configuration"]
    const nav = useNavigate()

    const getMenuOpts = () => {
        const list = opts.map((key, index) => (
            <button className="rounded-3xl text-xl font-semibold text-black dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 px-6 py-2" onClick={() => nav(key.toLowerCase())}>{key}</button>
        ))

        return list
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            {getMenuOpts()}
            {/* <ProfileCard /> */}
        </div>
    )
}

export default LateralMenu