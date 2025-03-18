// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../hooks/useAuth"
// import { logadoAsync, refreshAsync } from "../../services/auth"
// import { useState } from "react"
// import { getAllPostByUsrId, sendPostAsync } from "../../services/post"

// interface post {
//     id : number
//     conteudo : string
// }

// export default function ReqTest() {

//     const { tipo_usuario, usuario_ID, logout, getToken, userData } = useAuth()
//     const [fields , setFields] = useState({msg : "teste"})
//     const [posts, setPosts] = useState<post[]>([])

//     const nav = useNavigate()

//     const handleLogout = () => {
//         logout()
//         nav("/")
//     }

//     const handleGetData = async () => {
//         const resp = await getAllPostByUsrId(getToken(), usuario_ID?.toString() ?? "")
//         console.log(resp)
//         setPosts(resp.data.dados.listaPostagens)
//     }

//     const handlePost = async () => {
//         const data = {usuario_id : usuario_ID, conteudo : fields["msg"], tipo : "feed"}
//         const resp = await sendPostAsync(getToken(), data)
//         if (resp.data.success) {
//             await handleGetData()
//         }
//     }

//     const handleOnChanceInput = (x : any) => {
//         setFields((prev) => ({
//             ...prev, msg : x.target.value
//         }))
//     }

//     const managePosts = () => {
//         const p = posts.map((value) => {
//             return <p key={value.id}>{value.conteudo ?? ""}</p>
//         })

//         return p
//     }

//     if (usuario_ID && usuario_ID < 0 ) {
//         return (
//             <div className="bg-black"><h1 className="text-4xl text-white">carregando....</h1></div>
//         )
//     }

//     return (
//         <div className="flex flex-col w-full h-screen bg-black justify-between items-center gap-4">
//             <div className="grid grid-cols-4 gap-3 text-center bg-red-800">
//                 <h2 className="text-white text-xl p-4">{tipo_usuario}</h2>
//                 <h2 className="text-white text-xl p-4">{usuario_ID}</h2>
//                 <h2 className="text-white text-xl p-4">{userData.nome}</h2>
//                 <h2 className="text-white text-xl p-4">{userData.email}</h2>
//                 <button className="p-4 text-white text-xl bg-blue-500" onClick={handleLogout}>logout</button>
//             </div>

//             <div className="flex flex-col items-center justify-end gap-2 bg-red-500 h-full w-[600px]">
//                 <div>
//                     {posts ? (managePosts()) : ""}
//                 </div>
//                 <input type="text" className="" value={fields.msg} onChange={handleOnChanceInput}/>
//                 <button className="p-4 bg-blue-500 text-white w-fit" onClick={handlePost}>enviar post</button>
//             </div>

//             <div className="grid grid-cols-3 gap-3 ">
//                 <button className="p-4 text-white text-xl bg-blue-500" onClick={() => logadoAsync(getToken())}>função logado</button>
//                 <button className="p-4 text-white text-xl bg-blue-500" onClick={() => refreshAsync()}>função refresh</button>
//                 <button className="p-4 text-white text-xl bg-blue-500" onClick={() =>  nav("/")}>função voltar</button>
//                 <button className="p-4 text-white text-xl bg-blue-500" onClick={() => handleGetData()}>função pegar posts</button>
//                 <button className="p-4 text-white text-xl bg-blue-500" >post</button>
//                 <button className="p-4 text-white text-xl bg-blue-500">edit user</button>
//             </div>

//         </div>
//     )
// }