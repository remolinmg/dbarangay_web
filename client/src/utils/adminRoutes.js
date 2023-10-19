import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';

const AdminRoute = () => {

  const admin = localStorage.getItem('accountType') === 'admin';
  const superadmin=localStorage.getItem('accountType') === 'superadmin'

  if (admin) {
    return <Outlet />; // Allow access to the protected route
  } else if(superadmin){ 
    return <Outlet />;
  }else {
    return <Navigate to="/admin" />;
  }
}

export default AdminRoute;