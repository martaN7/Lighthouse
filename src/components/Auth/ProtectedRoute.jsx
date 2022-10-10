import React from 'react';
import { useAuth } from '../Auth/Auth';
import { Navigate, Outlet } from 'react-router-dom';


export default function ProtectedRoute({children}) {
    const {user} = useAuth();

    if (!user){
        return <Navigate to={'/'} replace />
    }

  return <Outlet />
}