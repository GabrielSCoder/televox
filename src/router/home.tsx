import { Route, BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";

export default function HomeRouter() {

    const router = createBrowserRouter([{
        path : "/",
        element : <HomeLayout />,
        children : [
            {
                path : "",
                element : <Login />
            }
        ]
    }])

    return (
        <RouterProvider router={router} />
    )
}