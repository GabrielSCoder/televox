import { useState } from "react";
import { getNotificationsbyId } from "../services/notification";
import { socket } from "../services/socket";

export default function useNotifications() {

    const [notifyData, setNotifyData] = useState([]);
    const [notififyIdList, setNotifyIdList] = useState([])
    const [loading, setLoading] = useState(true);

    const getData = async (id: number) => {
        setLoading(true);
        const resp = await getNotificationsbyId(id ?? 0);
    
        if (resp.data.success) {

            const ids = resp.data.dados.map((value : any) => value.id)
            setNotifyIdList(ids)

            const groupedNotifications = resp.data.dados.reduce((acc: any, item: any) => {
                if (item.tipo === "follow") {
                    acc.push({
                        notification_ids: [item.id], 
                        tipo: "follow",
                        mensagem: `${item.usuario.nome} seguiu você`,
                        usuario: {
                            nome: item.usuario.nome,
                            username: item.usuario.username,
                            img_url: item.usuario.img_url || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                        }
                    });
                } else if (item.tipo === "like") {
                    let existing = acc.find((n: { tipo: string; post_id: any; }) => n.tipo === "like" && n.post_id === item.post_id);
    
                    const usuarioData = {
                        nome: item.usuario.nome,
                        username: item.usuario.username,
                        img_url: item.usuario.img_url || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg",
                        post_id: item.post_id
                    };
    
                    if (existing) {
                        if (!existing.usuarios.some((u: { username: any; }) => u.username === usuarioData.username)) {
                            existing.usuarios.push(usuarioData);
                            existing.notification_ids.push(item.id); 
                        }
                    } else {
                        acc.push({
                            tipo: "like",
                            post_id: item.post_id,
                            usuarios: [usuarioData],
                            notification_ids: [item.id] 
                        });
                    }
                } else if (item.tipo === "reply") {
                    let existing = acc.find((n: { tipo: string; post_id: any; }) => n.tipo === "reply" && n.post_id === item.post_id);
    
                    const usuarioData = {
                        nome: item.usuario.nome,
                        username: item.usuario.username,
                        img_url: item.usuario.img_url || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg",
                        post_id: item.post_id
                    };
    
                    if (existing) {
                        if (!existing.usuarios.some((u: { username: any; }) => u.username === usuarioData.username)) {
                            existing.usuarios.push(usuarioData);
                            existing.notification_ids.push(item.id); 
                        }
                    } else {
                        acc.push({
                            tipo: "reply",
                            post_id: item.post_id,
                            usuarios: [usuarioData],
                            notification_ids: [item.id] 
                        });
                    }
                }
                return acc;
            }, []);
        
            setNotifyData(groupedNotifications);
            setLoading(false);

            return true

        }
    };
    

    const confirmNotify = async (some : any, id : number) => {
        console.log(some)
        socket.emit("notify", {id : id, notifications : notififyIdList})
    }

    return {
        loading,
        getData,
        confirmNotify,
        notifyData
    }
}