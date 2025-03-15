import { getRequest, postRequest } from "./requests"

export const getNotificationsbyId = async (id : number ) => {
    return await getRequest( "/notificacao/" + id)
}

export const confirmNotifications = async (data : any ) => {
    return await postRequest( "/notificacao/confirm", data)
}
