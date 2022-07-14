import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { Alert } from "../Helpers/Alert";


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const [error, setError] = useState()

  const {login, loginWithGoogle}= useAuth()

  const handleChange = ({target:{ name, value}}) => {
    setUser({...user, [name]: value})

  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try {
        await login(user.email, user.password)
        navigate('/')
    } catch (error) {
        console.log(error.message)
        /*if (error.code === "auth/internal-error") {
            setError("Correo invalido")
        }*/
        setError(error.message)
    }
  }

  const handleGoogleSignIn = async() => {
    try {
    await loginWithGoogle()
    navigate('/')
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <div>

        {error && <Alert message={error}/>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="youremail@company.com"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
        />

        <button>Login</button>
      </form>

      <button onClick={handleGoogleSignIn}>Iniciar Sesion con Google</button>
    </div>
  );
};

export default Login;