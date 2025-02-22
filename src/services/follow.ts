import { getRequest, postRequest } from "./requests"

export const getAllFollowers = async (token : string, id : string) => {
    return await getRequest(token,"/follow/followers/" + id)
} 

export const VerifyFollowing = async (token : string, id : any) => {
    return await getRequest(token, "/follow/" + id)
}

export const VerifyXY = async (token : string, data : any) => {
    return await postRequest(token, "/follow/verifyUserX", data)
}

export const getTotalizerF = async (token : string, id : any) => {
    return await getRequest(token, "/follow/total/" + id)
}