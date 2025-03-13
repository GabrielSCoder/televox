import { useEffect, useState } from "react";
import { getNotificationsbyId } from "../../services/notification";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { IoIosHeart } from "react-icons/io";

export default function Notifications() {
    const location = useLocation();
    const id = location.state.id;
    const nav = useNavigate()

    const [notifyData, setNotifyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        const resp = await getNotificationsbyId(id ?? 0);

        if (resp.data.success) {
            const groupedNotifications = resp.data.dados.reduce((acc: any, item: any) => {
                if (item.tipo === "follow") {
                    acc.push({
                        tipo: "follow",
                        mensagem: `${item.usuario.nome} seguiu você`,
                        usuario: {
                            nome: item.usuario.nome,
                            username: item.usuario.username,
                            img_url: item.usuario.img_url
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
                        }
                    } else {
                        acc.push({
                            tipo: "like",
                            post_id: item.post_id,
                            usuarios: [usuarioData]
                        });
                    }
                }
                return acc;
            }, []);

            setNotifyData(groupedNotifications);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    if (loading) {
        return <LoadingPageTemplate className="h-full w-full" />;
    }

    return (
        <div className="h-full w-full">
            <h2 className="text-white text-xl font-bold mb-4 p-2">Notificações</h2>
            {notifyData.map((notification: any, index) => (
                <div key={index} className="border-b border-t border-gray-500 h-[120px] text-white flex items-center gap-4 hover:cursor-pointer hover:bg-gray-800 px-2"
                onClick={() => console.log(`/${"admin"}/post/${notification.post_id}`)}>

                    {notification.tipo === "follow" && <p>{notification.mensagem}</p>}

                    {notification.tipo === "like" && (
                        <div className="flex items-start gap-1">

                            <div className="mt-2">
                                <IoIosHeart size={30} className="text-rose-600 mr-6" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2 -space-x-2 items-center">
                                    {notification.usuarios.slice(0, 10).map((user: any, idx: number) => (
                                        <img
                                            key={idx}
                                            src={user.img_url}
                                            alt={user.nome}
                                            className="w-10 h-10 rounded-full border-1 border-gray-200"
                                        />
                                    ))}
                                </div>
                                <p>
                                    {notification.usuarios.length === 1
                                        ? `${notification.usuarios[0].nome} curtiu seu post`
                                        : notification.usuarios.length <= 3
                                            ? `${notification.usuarios.map((u: { nome: any; }) => u.nome).join(", ")} curtiram seu post`
                                            : `${notification.usuarios.slice(0, 2).map((u: { nome: any; }) => u.nome).join(", ")} e outras ${notification.usuarios.length - 2} pessoas curtiram seu post`}
                                </p>
                            </div>



                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
