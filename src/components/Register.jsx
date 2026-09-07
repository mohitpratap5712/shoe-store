import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [success, Setsucces] = useState(false)
  const [message , Setmessage] = useState("")
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const handlechange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://shoe-store-h5gu.onrender.com/register",
        user
      );
      Setmessage(response.data.message)
   Setsucces(true)
      setTimeout(() => {
        Setsucces(false)
      }, 3000);
      

      setTimeout(() => {
         navigate("/login")
      }, 3000);
    

    
      console.log(response.data);
      
 setUser({
          name: "",
          email: "",
          password: "",
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handlechange}
          placeholder="Enter Name"
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handlechange}
          placeholder="Enter Email"
        />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handlechange}
          placeholder="Enter Password"
        />

        <button type="submit">Send to Backend</button>
      </form>
      <div className=""> Backend Response {message} </div>
      {success && <div className=" w-full h-24 bg-green-500 flex justify-center items-center">register successfull</div>
      }    </>
  );
};

export default Register;