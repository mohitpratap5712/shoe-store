import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://shoe-store-h5gu.onrender.com/login",
        user
      );

      console.log(response.data);


      // Save JWT
      localStorage.setItem( 
        "token",
        response.data.token
      );


      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      // Check role
      if (response.data.user.role === "admin") {

        navigate("/adminpanel");

      } else {

        navigate("/");

      }


    } catch (error) {

      console.log(error.response?.data);

    }

  };


  return (

    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

};

export default Login;