import { getRequest, postRequest } from "./requests";

export const getPostbyId = async (id : string) => {
    return await getRequest("", "/post/" + id)
}

export const getAllPostByUsrId = async (token : string, id : string) => {
    return await getRequest(token,"/post/all/" + id)
} 

export const sendPostAsync = async (token : string, data : any) => {
    return await postRequest(token, "/post", data)
}