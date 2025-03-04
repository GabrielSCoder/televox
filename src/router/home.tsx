import GroupsTemplate from "../templates/GroupsTemplate";
import FeedLayout from "../layouts/FeedLayout";
import ProfilePage from "../pages/Profile";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
import Postview from "../pages/PostView";

const routesFeed = {
    path: "/",
    element: (
        <FeedLayout />
    ),
    errorElement: "",
    children: [
        {
            path: "home",
            element: <Home />
        },
        {
            path: ":username",
            element: (
                <ProfilePage />
            )
        },
        {
            path: ":username/following",
            element: (
                <ProfilePage />
            )
        },
        {
            path: ":username/followers",
            element: (
                <ProfilePage />
            )
        },
        {
            path : ":username/post/:id",
            element : <ProfilePage />
        },
        {
            path: "/*",
            element: <Navigate to={"/home"} />
        },
        // {
        //     path: "grupos",
        //     element: <GroupsTemplate />
        // },
       
        // {
        //     path : "notifications",
        //     element : <NotificationsTemplate />
        // },
        // {
        //     path : "messages",
        //     element : <PrivateMessagesTemplate />
        // },
       
    ]
}

export default routesFeed