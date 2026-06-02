import React from 'react'
import { Navigate, replace } from 'react-router-dom'
const ProtectedRoute = ({children}:{children:React.ReactNode} ) => {
   const token = localStorage.getItem('token')

   if (!token){
    return <Navigate to={"/login"}/ >;
   }
  
    return  children
  
}

export default ProtectedRoute