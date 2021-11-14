import React from 'react'
import { Route, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

// 如果用户没有登录，则无法进入profile界面
// export default function PrivateRoute({element:Element, ...rest}) {
//   const { currentUser } = useAuth();
//   return (
//     <Route {...rest} Element={currentUser && <Navigate replace to="/signup" />} /> 
//   )
// }

export default function PrivateRoute() {
  return <div>123</div>
}