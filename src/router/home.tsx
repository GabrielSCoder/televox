import Postview from "../pages/PostView";
import FeedTemplate from "../templates/FeedTemplate";
import GroupsTemplate from "../templates/GroupsTemplate";
import NotificationsTemplate from "../templates/Notifications";
import PrivateMessagesTemplate from "../templates/PrivateMessages";
import FeedLayout from "../layouts/FeedLayout";
import ProfilePage from "../pages/Profile";

const routesFeed = {
    path: "/",
    element: <FeedLayout />,
    errorElement: "",
    children:  [
        {
            path : "home",
            element : <FeedTemplate />
        },
        {
            path : ":username",
            element : <ProfilePage />
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
}

export default routesFeed