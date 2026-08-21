import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      console.log(response.data);
 
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
    </>
  );
};

export default Register;