import { Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";

const FeedLayout : React.LazyExoticComponent<any> = lazy(() => import ("../layouts/FeedLayout"))
const ProfilePage : React.LazyExoticComponent<any> = lazy(() => import ("../pages/Profile"))
const Home : React.LazyExoticComponent<any> = lazy(() => import ("../pages/Home"))
const Notifications : React.LazyExoticComponent<any> = lazy(() => import ("../pages/Notifications"))

const PreventFeedRoute = () => {
    // const isAuthenticated = window.localStorage.getItem("content") === "true";
    const auth = window.localStorage.getItem("profile")

    return !auth ? <Navigate to="/" /> : <Outlet />;
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
                    element: <ProfilePage />
                },
                {
                    path: ":username/following",
                    element: <ProfilePage />
                },
                {
                    path: ":username/followers",
                    element: <ProfilePage />
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
            ]
        }

    ]
}

export default routesFeed