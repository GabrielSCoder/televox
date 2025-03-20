import { useState } from "react"

// export default function ChatMK1() {

//     const [isConnected, setIsConnected] = useState(socket.connected)
//     const [clienteId, setCLienteId] = useState()
//     const [clientName, setClientName] = useState('')
//     const [chatData, setChatData] = useState<any[]>([])
//     const [message, setMessage] = useState('')
//     const [likes, setLikes] = useState(0)
//     const [deslikes, setDeslikes] = useState(0)

//     function onConnect() {

//         socket.connect()

//         socket.off("connect").on('connect', () => {
//             console.log('conectado', socket.id)
//             setIsConnected(true)
//             setCLienteId(socket.id)
//         })

//         socket.off("disconnect").on("disconnect", () => {
//             console.log("desconectado")
//             setIsConnected(false)
//             setCLienteId(null)
//         })

//         socket.on("receiveMessage", (message) => {
//             console.log(message)
//             setChatData((prev) => [...prev, message])
//         })

//         socket.on("likes", (data) => {
//             setLikes(data.likes)
//         })

//         socket.on("deslikes", (data) => {
//             setDeslikes(data.deslikes)
//         })
//     }

//     const clickDeslike = () => {
//         // setDeslikes(deslikes + 1)
//         socket.emit("deslikes", { deslikes: deslikes})
//     }

//     const clickLike = () => {
//         // setLikes(likes + 1)
//         socket.emit("likes", { likes: likes })
//         console.log("indo")
//     }


//     function onDisconnect() {
//         socket.disconnect()
//     }

//     function sendMsg() {
//         socket.emit("sendMessage", { usuario: clientName, message: message })
//         setMessage("")
//     }

//     useEffect(() => {

//         return () => {
//             socket.off("connect", onConnect)
//             socket.off("disconnect", onDisconnect)
//             socket.off("receiveMessage")
//             socket.off("likes")
//             socket.off("deslikes")
//             socket.disconnect()
//         }

//     }, []);

//     return (

//         <div className="h-screen bg-black flex items-center justify-center">

//             {!clienteId ? (
//                 <div className="flex flex-col">
//                     <input type="text" placeholder="Insira seu usuario" onChange={(e) => setClientName(e.target.value)} className="placeholder:text-white text-white border bg-black" />
//                     <button onClick={() => onConnect()} className="hover:bg-blue-500 text-white bg-blue-600">Conectar</button>
//                 </div>
//             ) : (

//                 <div className="bg-gray-500 grid grid-cols-2 justify-center items-center m-12 p-20 gap-4">
//                     <button className="p-4 text-white bg-green-500 rounded-3xl col-span-1" onClick={clickLike}>Aprovo</button>
//                     <button className="p-4 text-white bg-red-500 rounded-3xl col-span-1" onClick={clickDeslike}>Desaprovo</button>
//                     <p className="text-xl text-white">Valor aprovo : {likes}</p>
//                     <p className="text-xl text-white">Valor desaprovo : {deslikes}</p>
//                 </div>

//             )}
//         </div>

//     )
// }

export default function DeleteFollow() {

    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const conectado = true


    const em = () => {
        console.log("unfollow", ({ follower_id: input1, following_id: input2 }))
    }

    const Connect = () => {
        return (
            <div className="h-screen bg-black text-white flex justify-center items-center">
                <button className="p-4 rounded-md text-white bg-blue-500" onClick={undefined}>CONECTAR</button>
            </div>
        )
    }

    const Del = () => {

        return (
            <div className="grid grid-cols-2 justify-center items-center h-screen p-4">
                <input type="text" className="col-span-1 text-white bg-black placeholder:text-white" placeholder="follower_id" onChange={(e) => setInput1(e.target.value)} value={input1} />
                <input type="text" className="col-span-1 text-white bg-black placeholder:text-white" placeholder="following_id" onChange={(e) => setInput2(e.target.value)} value={input2} />
                <button className="text-white bg-red-500 rounded-md col-span-2" onClick={em}>Deletar</button>
                <button className="text-white bg-red-500 rounded-md col-span-2" onClick={undefined}>OFF</button>
            </div>
        )
    }



    return (
        !conectado ? <Connect /> : <Del />
    )
}






{/* <div className="h-screen flex flex-col justify-between items-center bg-black text-white text-xl">
<div>
    <h2 className="text-center" >Socket test</h2>
    {clienteId && <h3 className="">Olá {clientName} - ID {clienteId}</h3>}
</div>

<div className="min-h-[400px] bg-red-700 flex flex-col items-center justify-center my-2 w-[400px]">
    {chatData && chatData.map((msg, index) => (
        <p key={index}>{msg.usuario} - {msg.message}</p>
    ))}
</div>

{!clienteId ? (
    <div className="flex flex-col">
        <input type="text" placeholder="Insira seu usuario" onChange={(e) => setClientName(e.target.value)} className="placeholder:text-black text-black" />
        <button onClick={() => onConnect()} className="hover:bg-blue-500">Conectar</button>
    </div>

) : (
    <div className="flex flex-col">

        <input type="text" placeholder="sua mensagem" onChange={(e) => setMessage(e.target.value)} value={message} className="placeholder:text-white bg-black text-white" />
        <button onClick={sendMsg}>Send message</button>
        <button onClick={() => onDisconnect()}>Desconectar</button>
    </div>
)}

</div> */}