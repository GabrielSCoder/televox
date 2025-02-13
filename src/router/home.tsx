import Postview from "../pages/PostView";
import FeedTemplate from "../templates/FeedTemplate";
import GroupsTemplate from "../templates/GroupsTemplate";
import NotificationsTemplate from "../templates/Notifications";
import PrivateMessagesTemplate from "../templates/PrivateMessages";
import FeedLayout from "../layouts/FeedLayout";
import ProfilePage from "../pages/Profile";
import Home from "../pages/Home";
import { FeedProtectedRoute, ProfileProtectedRoute } from "./ProtectedRoutes";

const routesFeed = {
    path: "/",
    element: (
        <FeedProtectedRoute>
            <FeedLayout />
        </FeedProtectedRoute>
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
                <ProfileProtectedRoute>
                    <ProfilePage />
                </ProfileProtectedRoute>
            )
        },
        {
            path: "grupos",
            element: <GroupsTemplate />
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