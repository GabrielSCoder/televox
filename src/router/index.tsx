import { createBrowserRouter, Navigate, Outlet, RouterProvider,  } from "react-router-dom";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import routesFeed from "./home";

const PreventLoginRoute = () => {
    // const isAuthenticated = window.localStorage.getItem("content") === "true";
    const auth = window.localStorage.getItem("profile")

    return auth ? <Navigate to="/home" /> : <Outlet />;
};

export default function MainRouter() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <PreventLoginRoute />,
            errorElement: "Non ecziste",
            children: [
                {
                    path: "",
                    element: <HomeLayout />,
                    children: [
                        { path: "", element: <Login /> }
                    ]
                }
            ]
        },
        routesFeed
    ])

    return (
        <RouterProvider router={router} />
    )
}
