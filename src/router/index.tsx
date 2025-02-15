import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import routesFeed from "./home";
import ReqTest from "../pages/requisitionsTest";
import { HomeProtectedRoute } from "./ProtectedRoutes";
import { useAuth } from "../contexts/userContext";
import Groups from "../templates/Groups";
import { Example } from "../pages/Group";

const rootRoute = () => {

    const { loading, logado } = useAuth()

    console.log("está logado = ", logado)

    if (loading) {
        return (
            <div className="h-[100vh] flex justify-center items-center bg-blue text-white text-3xl">
                <h1>Estou preso aqui...</h1>
            </div>
        )
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
                },
                {
                    path: "grupos",
                    element: <Example />
                }
            ]
        },
        {
            path: "/test",
            element: <HomeProtectedRoute />,
            children: [{ path: "", element: <ReqTest /> }]
        },
        // routesFeed
    ])

    return (
        <RouterProvider router={router} />
    )
}
