import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [success, Setsucces] = useState(false)
  const [failed, Setfailed] = useState(false)
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

    <div className="parent w-full h-[90%] ">

      <h1 className="text-amber-700 w-full items-center justify-center flex text-6xl" >Login</h1>
      {success && <div className="w-full h-20 bg-green-300 ">login success</div>}
      {failed && <div className="w-full h-20 bg-red-300 ">Failed Login</div>}


      <form className=" w-full h-[80vh] flex items-center justify-start  gap-5  bg-red-100 flex-col 
              hover:shadow-amber-800 hover:-translate-x-2.5 " 
              onSubmit={handleSubmit}>
        <input className="mt-6 border-2 rounded-1xl p-1.5
       hover:shadow-xl hover:-translate-x-2 hover:border-blue-500
            transition duration-300 ease-out"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input  className="mt-6 border-2 rounded-1xl p-1.5 hover:border-blue-500 hover:shadow-xl
        hover:-translate-x-2.5  transition duration-300 ease-out
        "
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}

        />

        <button className=" bg-gray-600 text-white  w-13 border-r-4 
        hover:shadow-2xl hover:-translate-x-2.5 hover:font-bold hover:w-16 hover:h-9
        " type="submit ">
          Login
        </button>

      </form>


    </div>

  );

};

export default Login;
