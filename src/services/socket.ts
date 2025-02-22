import { io } from "socket.io-client";
import { API_URL } from "../utils/api";

export const socket = io(API_URL, {
    autoConnect : false,
    withCredentials : true
})
