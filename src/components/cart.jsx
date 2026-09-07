import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Cart = () => {
    const [cart, setcart] = useState(null)
    const addToCart  = async()=>{
        
    }
    const getcart = async () => {

        const token = localStorage.getItem("token")

        console.log(token)

        const response = await axios.get(
  "https://shoe-store-h5gu.onrender.com/cart",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
        console.log(response.data)

        setcart(response.data.cart)
    }

    useEffect(() => {
        getcart()
    }, [])
    return (
        <>
            {
                cart?.items && cart.items.length >0 ?(
                cart?.items?.map((item) => (
                    <div key={item._id}>

                        <p>
                            Price: ₹{item.product.price}
                        </p>

                        <p>
                            Quantity: {item.quantity}
                        </p>
                    </div>

                ))):(
                    <p>no item found in your Cart</p>
                )
            }
        </>


    )
}
