import FeedLayout from "../layouts/FeedLayout";
import ProfilePage from "../pages/Profile";
import Home from "../pages/Home";
import { Navigate, Outlet } from "react-router-dom";
import Notifications from "../pages/Notifications";

const PreventFeedRoute = () => {
    const isAuthenticated = window.localStorage.getItem("content") === "true";

    return !isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

const routesFeed = {
    path: "/",
    element: (
        <PreventFeedRoute />
    ),
    errorElement: "",
    children: [
        {
            path: "/",
            element: <FeedLayout />,
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
                    path: ":username/post/:id",
                    element: <ProfilePage />
                },
                {
                    path: "/*",
                    element: <Navigate to={"/home"} />
                },
                {
                    path : "notifications",
                    element : <Notifications />
                },
                // {
                //     path: "grupos",
                //     element: <GroupsTemplate />
                // },

                // {
                //     path : "notifications",
                //     element : <NotificationsTemplate />
                // },
                

            ]
        }

    ]
}

export default routesFeed