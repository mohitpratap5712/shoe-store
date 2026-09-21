import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { About } from "./components/About";
import { Contact } from "./components/contact";
import Register from "./components/Register";
import Login from "./components/login";

import Adminpanel from "./components/adminpanel";
import { Cardopener } from "./components/Cardopener";
import { Cards } from "./components/cards";
import { Cart } from "./components/cart";

import Banner from "./assets/shoebanner.jpg";
import axios from "axios"; 
import { useEffect, useState } from "react";

function App() {
  const [success, setsuccess] = useState(false)
  const [disabled, setdisabled] = useState(false)
  const [cartSuccess,setcartSuccess] = useState(false)
  const [openCart,setOpenCart] = useState(false)
  const [product, setProduct] = useState([])
  const token = localStorage.getItem("token")

 const handleToggleCart = () => setOpenCart(!openCart);

  const fetchData = async () => {
    try {
      const data = await axios.get(
        "https://shoe-store-h5gu.onrender.com/products"
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
  //add to cart function
 const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      "https://shoe-store-h5gu.onrender.com/cart",
      {
        productId: productId,
        quantity: quantity
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setcartSuccess(true)
    setTimeout(() => {
          setcartSuccess(false)

    }, 3000);

    console.log("Cart response:", response.data);

  } catch (error) {
    console.log("cart problem", error);
  }
};
  // Buy Now Function
  const handleclick = async (productId) => {
    setdisabled(true)
    console.log(productId.productId)

    try {

      const response = await axios.post(
        "https://shoe-store-h5gu.onrender.com/orders",
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
      setsuccess(true)
      console.log("Backend Response:");
      console.log(response.data);

    } catch (err) {
      console.log(err);
    }


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
          <Navbar onCartToggle={handleToggleCart}
    
          />
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
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar />
          <Cart />
        </>
      )
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />

       {openCart && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={() => setOpenCart(false)}
          />
          {/* Cart Sidebar panel */}
          <div className="fixed top-0 right-0 w-full sm:w-[50%] md:w-[35%] h-full bg-gray-100 shadow-2xl flex flex-col z-50 p-6 animate-slide-in">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h3 className="text-xl font-bold">My Cart!</h3>
              <button 
                className="text-2xl font-bold hover:text-red-500 transition-colors" 
                onClick={() => setOpenCart(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <h4 className="text-sm text-gray-500 mb-4">Cart has  items</h4>
              <Cart />
            </div>
          </div>
        </>
      )}


      <section onClick={()=>{setOpenCart(false)}}>
        <img className="w-full h-screen" src={Banner} alt="" />
      </section>

      <div onClick={()=>{setOpenCart(false)}} className="bestseller h-160 bg-gray-200 w-full">

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


            {product.slice(0, 5).map((pro) => {
              return <Cards key={pro._id}
                image={pro.image}
                price={pro.price}
                title={pro.title}
                productId={pro._id}
                quantity={1}
                disabled={disabled}
                handleclick={handleclick}
                addToCart={addToCart}


              />
            }
            )}
          
          </div>
          {success && <div className=" absolute  w-full h-17 bg-green-400 flex justify-center z-10 text-5xl">order placed successfully</div>}
 {cartSuccess && (
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-medium animate-bounce pointer-events-auto">
            Added to cart successfully!
          </div>
        )}        </div>


      </div>






    </>
  );
}

export default App;
