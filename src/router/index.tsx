import { Route, BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import FeedLayout from "../layouts/FeedLayout";
import ProfileCard from "../components/ProfileCard";
import ProfileTemplate from "../templates/ProfileTemplate";
import GroupsTemplate from "../templates/GroupsTemplate";
import NotificationsTemplate from "../templates/Notifications";
import PrivateMessagesTemplate from "../templates/PrivateMessages";
import FeedTemplate from "../templates/FeedTemplate";

export default function FeedRouter() {

    const router = createBrowserRouter([{
        path : "/",
        element : <FeedLayout />,
        children : [
            {
                path : "home",
                element : <ProfileTemplate />
            },
            {
                path : "",
                element : <FeedTemplate />
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
            
        ]
    }])

    return (
        <RouterProvider router={router} />
    )
}