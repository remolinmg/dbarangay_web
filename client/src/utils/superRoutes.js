import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';

const SuperRoute = () => {

  const accountType = localStorage.getItem('accountType') === 'superadmin';

  if (accountType ) {
    return <Outlet />; // Allow access to the protected route
  } else {
    return <Navigate to="/dashboard" />;
  }
}

export default SuperRoute;