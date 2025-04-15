import React from 'react';
import { useAuth } from '../contexts/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {  
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Navigate to="/" replace />; // Giriş yapılmadıysa yönlendir
    }

    return <Outlet />; // Giriş yapıldıysa iç bileşeni render et
};

export default ProtectedRoutes;
