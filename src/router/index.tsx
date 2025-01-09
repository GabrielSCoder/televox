import { Route, BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import FeedLayout from "../layouts/FeedLayout";

export default function FeedRouter() {

    const router = createBrowserRouter([{
        path : "/",
        errorElement : <FeedLayout />,
        children : [
            {
                path : "",
                element : <Home />
            }
        ]
    }])

    return (
        <RouterProvider router={router} />
    )
}