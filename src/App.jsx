import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import Register from "./components/register";
import Login from "./components/login";

import Adminpanel from "./components/adminpanel";
import { Cardopener } from "./components/cardopener";
import { Cards } from "./components/cards";

import Banner from "./assets/shoebanner.jpg";

import shoe1 from "./assets/adibrown.webp";
import shoe2 from "./assets/newbalance.webp";
import shoe3 from "./assets/newbalancewhite.webp";
import shoe4 from "./assets/addidas.webp";
import shoe5 from "./assets/newbbalance.webp";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [success, setsuccess] = useState(false)
  const [disabled, setdisabled] = useState(false)
  const [product, setProduct] = useState([])
  const token = localStorage.getItem("token")

  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3000/products"
      )

      setProduct(data.data.products)

      console.log(data.data.products)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Buy Now Function
  const handleclick = async (productId) => {
    setdisabled(true)
    console.log(productId.productId)
    console.log(typeof productId )

    try {

      const response = await axios.post(
        "http://localhost:3000/orders",
        {
          productId: productId.productId,
          quantity: 1
        }
        ,

        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      );

      console.log("Backend Response:");
      console.log(response.data);

    } catch (err) {
      console.log("not work");
    }
    setsuccess(true)

    setTimeout(() => {
      setsuccess(false)
      setdisabled(false)
    }, 3000)
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
        </>
      ),
    },
    {
      path: "/adminpanel",
      element: (
        <>
          <Navbar />
          <Adminpanel />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: "/brands",
      element: (
        <>
          <Navbar />
          <Cardopener />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      )
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      )
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <section>
        <img className="w-full h-screen" src={Banner} alt="" />
      </section>

      <div className="bestseller h-160 bg-gray-200 w-full">

        <div className="textseller w-full h-24 flex justify-around items-center">
          <p className="text-4xl">
            <b>Best</b> Seller
          </p>

          <span className="flex gap-4 text-xl w-45">
            <p className="flex items-center justify-center p-1 w-38 bg-black text-white">
              View Items
            </p>

            <p>0</p>
            <p>0</p>
          </span>
        </div>

        <div className="main w-full h-[90%] flex justify-center items-center">

          <div className="shoerack relative w-[80%] grid grid-cols-5">


            {product.slice(0,5).map((pro)=>{
              return <Cards key={pro._id}
              image={pro.image}
              price ={pro.price}
              title = {pro.title}
              productId={pro._id}
              disabled={disabled}
                handleclick={handleclick}
              
              
              />
            }
            )}

          </div>
          {success && <div className="  absolute w-full h-17 bg-green-400 flex justify-center z-10 text-5xl">order placed successfully</div>}

        </div>


      </div>






    </>
  );
}

export default App;
