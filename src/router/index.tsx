import { createBrowserRouter, Navigate, Outlet, RouterProvider,  } from "react-router-dom";
import routesFeed from "./home";
import { lazy } from "react";

const Home : React.LazyExoticComponent<any> = lazy(() => import ("../layouts/HomeLayout"))
const Login : React.LazyExoticComponent<any> = lazy(() => import("../pages/Login"))
const Sobre : React.LazyExoticComponent<any> = lazy(() => import("../pages/Sobre"))
const SobreMim : React.LazyExoticComponent<any> = lazy(() => import("../pages/SobreMim"))
const Tecnologias : React.LazyExoticComponent<any> = lazy(() => import("../pages/Tecnologias"))

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
                    element: <Home />,
                    children: [
                        { path: "", element: <Login /> },
                        {path: "sobre", element: <Sobre />},
                        {path : "tecnologias", element : <Tecnologias />},
                        {path : "sobremim", element : <SobreMim />}
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
