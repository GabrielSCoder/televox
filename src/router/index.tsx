import { createBrowserRouter, RouterProvider,  } from "react-router-dom";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import routesFeed from "./home";
import ChatMK1 from "../templates/ChatMK1Template";

export default function MainRouter() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeLayout />,
            errorElement: "Non ecziste",
            children: [
                {
                    path: "",
                    element: <Login />
                },
            ]
        },
        routesFeed
    ])

    return (
        <RouterProvider router={router} />
    )
}
