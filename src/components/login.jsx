import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
 const [success , Setsucces]= useState(false)
 const [failed , Setfailed] =useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
// const username1 = ""

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
      // username1 = response.data.name


      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      //message
      Setsucces(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      Setsucces(false);
      // Check role
      if (response.data.user.role === "admin") {

        navigate("/adminpanel");

      } else {
     
        navigate("/");

      }


    } catch (error) {
      Setfailed(true)
      setTimeout(() => {
        Setfailed(false)
      }, 3000);

      console.log(error.response?.data);

    }

  };


  return (

    <div>

      <h1>Login</h1>
  {success && <div className="w-full h-20 bg-green-300 ">login success</div> }
    {failed && <div className="w-full h-20 bg-red-300 ">Failed Login</div> }


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
