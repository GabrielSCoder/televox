import { createContext, ReactNode,  useEffect } from "react";
import { socket } from "../services/socket";

interface SocketContextType {
    disconnect: () => void;
}

export const SocketContext = createContext<SocketContextType | null>(null)

export default function SocketProvider (props : {children : ReactNode}) {

    const {children} = props
    
    const handleDisconnect = () => {
        socket.disconnect()
    }

    useEffect(() => {
        socket.connect()

        socket.on("connect", () => {
            console.log("conectado")
        })

        socket.on("desconnect", () => {
            console.log("desconectado")
        })

        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.disconnect()
        }
    })

    return (
        <SocketContext.Provider value={{disconnect : handleDisconnect}}>
            {children}
        </SocketContext.Provider>
    )
}

interface SocketContextType {
    disconnect: () => void;
}