import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../contexts/userContext";
import { ReactNode } from "react";

export const HomeProtectedRoute = () => {
    
    const { logado, loading } = useAuth();
    
    if (loading) {
        return <div className="h-screen p-8 bg-black "><p className="text-xl text-white"></p></div>
    }
    
    if (!logado) {
        return <Navigate to="/" replace />; 
    }

    return <Outlet />; 
};

export const ProfileProtectedRoute = ({children} : {children : JSX.Element}) => {
    
    const palavras_reservadas = ["home", "perfil", "grupos", "post"]

    const { username } = useParams()

    if (username && palavras_reservadas.includes(username.toLowerCase())) {
        return <Navigate to={"/"} replace />
    }

    return children
}

export function FeedProtectedRoute({children} : {children : JSX.Element}) {

    const { logado } = useAuth()

    if (!logado) {
        return <Navigate to="/" replace />;
    }

    return children
}
