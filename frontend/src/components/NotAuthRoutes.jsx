import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const NotAuthRoutes = ({ isAuth }) => {
  return (
    isAuth ? <Navigate to={'/'} /> : <Outlet />
  )
}

export default NotAuthRoutes