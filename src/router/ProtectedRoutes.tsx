import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/userContext";

const ProtectedRoute = () => {
    
    const { logado, loading } = useAuth();
    
    if (loading) {
        return <div className="h-screen p-8 bg-black "><p className="text-xl text-white"></p></div>
    }
    
    if (!logado) {
        return <Navigate to="/" replace />; 
    }

    return <Outlet />; 
};

export default ProtectedRoute;
