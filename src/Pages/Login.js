
import React, {  useEffect, useState } from "react";
import { validPassword,validEmail } from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../APICALLS/user";
import { message } from "antd";



function Login() {
  const [formData, SetformData]=useState({
    email:"",
    password:""
  })
  const [error,Seterror]=useState({})

  const navigate =useNavigate()
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      SetformData({ ...formData, email: value });
      Seterror({ ...error, email: "" });
    } else if (name === "password") {
      SetformData({ ...formData, password: value });
      Seterror({ ...error, password: "" });
    }
  };
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/home")
    }
  },[])

   const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    const emailError = validEmail(formData.email);
    const passwordError = validPassword(formData.password);

    const newErrors = {};
    if (emailError) {
      newErrors.email = emailError;
    }
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      Seterror(newErrors);
      return;
    }

    try {
      const response = await loginUser(formData);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token',response.data)
        navigate('/home');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('Registration failed');
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pb-8 pt-12 ">
        <form onSubmit={handleSubmit} >
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="text-gray-700 text-sm font-bold mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
            />
             {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="text-gray-700 text-sm font-bold mr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
            />
                        {error.password && <span className="text-red-500 text-sm">{error.password}</span>}

          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >Login
            </button>
            </div>
            <div className="flex justify-center">
            <Link to="/">  <button type="button" className="text-blue-500">Not Registered????</button> </Link>
            </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login