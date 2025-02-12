import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import routesFeed from "./home";
import ReqTest from "../pages/requisitionsTest";
import ProtectedRoute from "./ProtectedRoutes";
import { useAuth } from "../contexts/userContext";
import ProfilePage from "../pages/Profile";

const rootRoute = () => {

    const { loading, logado } = useAuth()

    if (loading) {
        return <div className="h-screen w-screen flex justify-center items-center bg-black text-white text-3xl">Carregando...</div>;
    }

    return logado ? <Navigate to="/home" replace /> : <HomeLayout />;
}


export default function MainRouter() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: (() => rootRoute())(),
            errorElement: "Non ecziste",
            children: [
                {
                    path: "",
                    element: <Login />
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
