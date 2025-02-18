import Postview from "../pages/PostView";
import FeedTemplate from "../templates/FeedTemplate";
import GroupsTemplate from "../templates/GroupsTemplate";
import NotificationsTemplate from "../templates/Notifications";
import PrivateMessagesTemplate from "../templates/PrivateMessages";
import FeedLayout from "../layouts/FeedLayout";
import ProfilePage from "../pages/Profile";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";

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
            path: "grupos",
            element: <GroupsTemplate />
        },
        {
            path: "/*",
            element: <Navigate to={"/home"} />
        }
        // {
        //     path : "notifications",
        //     element : <NotificationsTemplate />
        // },
        // {
        //     path : "messages",
        //     element : <PrivateMessagesTemplate />
        // },
        // {
        //     path : "post",
        //     element : <Postview />
        // },
    ]
}

export default routesFeed