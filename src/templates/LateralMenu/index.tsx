import { useNavigate } from "react-router-dom"
import ProfileCard from "../ProfileCard"
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import { BsBellFill } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";

type props = {
    username?: string
    id ?: number
}
function LateralMenu(props: props) {

    const { username, id } = props

    console.log(username, id)

    const opts = ["Home", "Notifications", "Groups", "Messages", "Configuration"]
    const opts2 = ["Home", "Perfil", "Notificações"]
    const menu_convidado = ["Home"]
    const logado = window.localStorage.getItem("content")

    const nav = useNavigate()

    const getMenuOpts = () => {
        let list = []
        list[0] = (
            <div key={0} className="flex items-center justify-center hover:bg-gray-200 hover:dark:bg-gray-800 rounded-3xl w-fit px-2">
                <GrHomeRounded size={20} className="text-white" />
                <button key={2} className="text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => nav(opts2[0].toLowerCase())}>Home</button>
            </div>

        )
        list[1] = (
            <div key={1} className="flex items-center hover:bg-gray-200 hover:dark:bg-gray-800 rounded-3xl w-fit px-2">
                <HiOutlineUser size={20} className="text-white" />
                <button key={2} className=" text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => nav("/" + username)}>Perfil</button>
            </div>
        )
        list[2] = (
            <div key={2} className=" relative flex items-center rounded-3xl hover:bg-gray-200 hover:dark:bg-gray-800 w-fit px-2">
                <div className="rounded-full p-2 bg-sky-500 absolute top-1 left-3"></div>
                <BsFillBellFill className="text-white" size={20}  />
                <button key={2} className="text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => nav("/notifications", {state : {id : id}})}>Notificações</button>
            </div>
        )
        return list
    }

    const getConvidadoMenu = () => {
        const list = menu_convidado.map((key, index) => (
            <button key={index} className="rounded-3xl text-xl font-semibold text-black dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 px-6 py-2" onClick={() => nav(key.toLowerCase())}>{key}</button>
        ))
        return list
    }

    return (
        <div className="flex flex-col gap-8">
                {logado == "true" ? getMenuOpts() : getConvidadoMenu()}
            
        </div>
    )
}

export default LateralMenu