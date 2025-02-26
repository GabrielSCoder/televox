export type followForm = {
    following_id : number
    follower_id : number
}

export type followTotalizer = {
    TotalFollowers ?: number
    TotalFollowings ?: number
}

export type compareForm = {
    user_id : number
    compare_id : number
}