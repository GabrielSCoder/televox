import { feedFilterDTO, getPostDTO, postFilterDTO } from "../types/postType";
import { getRequest, postRequest } from "./requests";

export const getPostbyId = async (data : getPostDTO ) => {
    return await postRequest( "/post/get", data)
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

export const getRepliesByPostId = async ( data : feedFilterDTO) => {
    return await postRequest( "post/reply", data)
}

export const getFeedMk1 = async ( data : feedFilterDTO) => {
    return await postRequest( "feed/mk1/", data)
}

export const getFeedMk2 = async ( data : feedFilterDTO) => {
    return await postRequest( "feed/mk2/", data)
}