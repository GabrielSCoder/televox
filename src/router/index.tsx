import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import routesFeed from "./home";
import ReqTest from "../pages/requisitionsTest";
import ProtectedRoute from "./ProtectedRoutes";

export default function MainRouter() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: < HomeLayout />,
            errorElement: "Non ecziste",
            children: [
                {
                    path: "",
                    element: <Login />
                },
                {
                    path: "/*",
                    element: <Navigate to={"/"} />
                }
            ]
        },
        {
            path: "/test",
            element: <ProtectedRoute />,
            children: [{ path: "", element: <ReqTest /> }]
        },
        routesFeed
    ])

    return (
        <RouterProvider router={router} />
    )
}
