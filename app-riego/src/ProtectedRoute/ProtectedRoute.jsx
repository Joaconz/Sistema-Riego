import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/authContext'
import LoadingSpinnet from '../Helpers/LoadingSpinnet'

export const ProtectedRoute = ({children}) => {

    const {user, loading} = useAuth()

    if (loading) return <LoadingSpinnet/>
    
    if (!user) return <Navigate to='/login'/>

  return (
    <div>{children}</div>
  )
}
