import React from 'react'
import { useAuth } from '../Context/authContext'
import LoadingSpinnet from '../Helpers/LoadingSpinnet'

const Home = () => {

    const {user, logout, loading} = useAuth()

    console.log(user)


    const handleLogout = async () => {
        await logout()
    }

    if (loading) {
        return <LoadingSpinnet/>
        
    }

  return (
    <div>
        <h1>Welcome {user.email}</h1>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home