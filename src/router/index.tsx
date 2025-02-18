import { createBrowserRouter, Navigate, RouterProvider,  } from "react-router-dom";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import ReqTest from "../pages/requisitionsTest";
import { useAuth } from "../contexts/userContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import routesFeed from "./home";

const rootRoute = () => {

    const { loading } = useAuth()
    const logado = window.sessionStorage.getItem("content")

    if (loading) {

        return (
            <div className="flex items-center justify-center h-[100vh]">
                <AiOutlineLoading3Quarters className="text-blue-500 animate-spin" size={30} />
            </div>
        )
    }

    return logado == "true" ? <Navigate to="/test" replace /> : <HomeLayout />;
}


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
        {
            path: "/test",
            element: <ReqTest />
        },
        routesFeed
    ])

    return (
        <RouterProvider router={router} />
    )
}
