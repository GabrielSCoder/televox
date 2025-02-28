import { feedFilterDTO, postFilterDTO } from "../types/postType";
import { getRequest, postRequest } from "./requests";

export const getPostbyId = async (id : string) => {
    return await getRequest( "/post/" + id)
}

export const getAllPostByUsrId = async ( id : string) => {
    return await getRequest("/post/all/" + id)
} 

export const getAllPostByUserIdAndReaction = async ( data : any) => {
    return await postRequest("/post/reactPost/list", data)
}

export const sendPostAsync = async ( data : any) => {
    return await postRequest("/post", data)
}

export const getPostsByFilter = async ( data : postFilterDTO) => {
    return await postRequest("post/filter/", data)
}

export const getFeedMk1 = async ( data : feedFilterDTO) => {
    return await postRequest( "feed/mk1/", data)
}