import { getRequest } from "./requests"

export const getNotificationsbyId = async (id : number ) => {
    return await getRequest( "/notificacao/" + id)
}