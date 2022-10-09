import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";


const ProtectedRoute = ({user}) => {

  const location = useLocation()

  // Check to see if user is logged in
  /* const user = useSelector(state => state?.users?.userAuth) */
  /* return (
    <Route {...rest} render={() => user ? <Component /> : <Navigate to='/login' />} /> 
    
  ) */
  return user ? <Outlet /> : <Navigate to={{pathname: '/', state: {from: location}}} />
}

export default ProtectedRoute;
