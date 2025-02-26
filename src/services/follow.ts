import { compareForm } from "../types/follow"
import { getRequest, postRequest } from "./requests"

export const getAllFollowers = async (id : string) => {
    return await getRequest("/follow/followers/" + id)
} 

export const VerifyFollowing = async (id : any) => {
    return await getRequest( "/follow/following/" + id)
}

export const getAllFollowersCompare = async (data : compareForm) => {
    return await postRequest("/follow/compare/followers", data)
} 

export const VerifyFollowingCompare = async (data : compareForm) => {
    return await postRequest( "/follow/compare/following", data)
}

export const VerifyXY = async ( data : any) => {
    return await postRequest( "/follow/verifyUserX", data)
}

export const getTotalizerF = async (id : any) => {
    return await getRequest( "/follow/total/" + id)
}