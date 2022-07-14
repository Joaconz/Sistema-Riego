import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";


const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const [error, setError] = useState()

  const {signUp}= useAuth()

  const handleChange = ({target:{ name, value}}) => {
    setUser({...user, [name]: value})

  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try {
        await signUp(user.email, user.password)
        navigate('/')
    } catch (error) {
        console.log(error.message)
        /*if (error.code === "auth/internal-error") {
            setError("Correo invalido")
        }*/
        setError(error.message)
    }
  }

  return (
    <div>

        {error && <p>{error}</p>}

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

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
