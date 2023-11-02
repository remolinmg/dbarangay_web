import React from 'react';
import { Outlet, Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = () => {
 
  const [cookies] = useCookies(['access_token']);
  const isAuthenticated = !!cookies.access_token;

  if (!isAuthenticated) {
    return <Navigate to="/visitor" />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;