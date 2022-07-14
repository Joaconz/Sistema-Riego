import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { NewUser } from "../Helpers/NewUser";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState();

  const { signUp } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      //NewUser(user.email);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      /*if (error.code === "auth/internal-error") {
            setError("Correo invalido")
        }*/
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <p>{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-fold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@company.com"
            onChange={handleChange}
            className="shadow appearance-none border-roundede w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-fold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
            className="shadow appearance-none border-roundede w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full">
          Register
        </button>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">Ya tienes una cuenta? <Link to='/login'>Inicia Sesion</Link></p>
    </div>
  );
};

export default Register;
