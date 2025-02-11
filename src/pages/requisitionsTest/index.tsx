import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/userContext"
import { useEffect } from "react"

export default function ReqTest() {
    const { logado, login, tipo_usuario, usuario_ID, logout, usuario_nome } = useAuth()
    const nav = useNavigate()

    const handleLogout = () => {
        logout()
        nav("/")
    }
    return (
        <div className="flex flex-col w-full h-screen bg-black justify-center items-center gap-4">
            <div className="grid grid-cols-4 gap-3 text-center bg-red-800">
                <h2 className="text-white text-xl p-4">{tipo_usuario}</h2>
                <h2 className="text-white text-xl p-4">{usuario_ID}</h2>
                <h2 className="text-white text-xl p-4">{usuario_nome}</h2>
                <button className="p-4 text-white text-xl bg-blue-500" onClick={handleLogout}>logout</button>
            </div>
            <div className="grid grid-cols-3 gap-3 ">
                <button className="p-4 text-white text-xl bg-blue-500">get Posts</button>
                <button className="p-4 text-white text-xl bg-blue-500">create Posts</button>
                <button className="p-4 text-white text-xl bg-blue-500">get user</button>
                <button className="p-4 text-white text-xl bg-blue-500">delete Posts</button>
                <button className="p-4 text-white text-xl bg-blue-500">edit Posts</button>
                <button className="p-4 text-white text-xl bg-blue-500">edit user</button>
                
                <button className="p-4 text-white text-xl bg-blue-500">edit Posts</button>
                <button className="p-4 text-white text-xl bg-blue-500">edit user</button>
            </div>

        </div>
    )
}