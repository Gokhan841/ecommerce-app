import React from 'react';
import { useAuth } from '../contexts/Auth';
import { Navigate } from 'react-router';

const ProtectedAdminRoute = () => {

    const { user } = useAuth();
    if (!user || user.role !== "admin") {
    
        return <Navigate to="/" replace />;
    }

    return (
        <Outlet /> // kullanıcı adminse admin rotalarını dönüyoruz
    )
}

export default ProtectedAdminRoute