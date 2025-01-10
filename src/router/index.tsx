import { Route, BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import FeedLayout from "../layouts/FeedLayout";
import ProfileCard from "../templates/ProfileCard";
import ProfileTemplate from "../templates/ProfileTemplate";
import GroupsTemplate from "../templates/GroupsTemplate";
import NotificationsTemplate from "../templates/Notifications";
import PrivateMessagesTemplate from "../templates/PrivateMessages";
import FeedTemplate from "../templates/FeedTemplate";
import Postview from "../pages/PostView";

export default function FeedRouter() {

    const router = createBrowserRouter([{
        path : "/",
        element : <FeedLayout />,
        children : [
            {
                path : "home",
                element : <FeedTemplate />
            },
            {
                path : "",
                element : <ProfileTemplate />
            },
            {
                path : "groups",
                element : <GroupsTemplate />
            },
            {
                path : "notifications",
                element : <NotificationsTemplate />
            },
            {
                path : "messages",
                element : <PrivateMessagesTemplate />
            },
            {
                path : "post",
                element : <Postview />
            },
            
        ]
    }])

    return (
        <RouterProvider router={router} />
    )
}