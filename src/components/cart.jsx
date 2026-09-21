import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Cart = () => {
    const [cart, setcart] = useState(null)
    const [cartSuccess, setcartSuccess] = useState(false)
    const [quantity, Updatedquantity] = useState()
    let increase = 0;
    //This is for the increasing the quantity 
  const increaseQuantity = async (productId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
            `https://shoe-store-h5gu.onrender.com/cart/increase/${productId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("Updated cart:", response.data.cart);

        setcart(response.data.cart);

    } catch (error) {
        console.log(error.response?.data || error);
    }
};

    const decreaseCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)

    const response = await axios.put(
      `https://shoe-store-h5gu.onrender.com/cart/decrease/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    setcart((await response).data.cart);
  } catch (error) {
    console.log(error.response?.data || error);
  }
};
    const getcart = async () => {

        const token = localStorage.getItem("token")

        const response = await axios.get(
            `https://shoe-store-h5gu.onrender.com/cart`,
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
    }, [],cartSuccess)
    
    return (
        <>
            <div className="cartDiv h-full w-[50%] flex flex-col gap-6 font-bold overflow-scroll  [&::-webkit-scrollbar]:hidden">
                {

                    cart?.items && cart.items.length > 0 ? (
                        
                        cart?.items?.map((item) =>  {
                            return(
                            <div  className='flex flex-row ' key={item._id} >
                              
                              <div className="left mr-25">
                                 <p>
                                   <img width={"100px"} src={item.product.image} alt="" />
                                </p>
                              </div>
                                <div className="right">
                                             <p>
                                    {item.product.title}
                                </p>
                               
                                <p>
                                    Price: ₹{item.product.price}
                                </p>


                                <div className='quantity-heading flex gap-4' >
                                    Quentity
                                    <div className="marks flex gap-4 ">
                                        <p onClick={()=>{decreaseCart(item.product._id)}} className='text-xl cursor-pointer' > - </p>
                                        <p className='quantity'>{item.quantity} </p>
                                        <p onClick={() => {increaseQuantity(item.product._id)}} className='text-xl cursor-pointer ' >+</p>

                                    </div>
                                </div>
                                    </div>
                       
                            </div>
                            )
})) : (
                        <p>OOPS!! Empty cart </p>
                    )
                }
            </div>
                                            <div className="checkout bg-blue-700 absolute bottom-5 right-6 p-6 w-[90%] flex justify-center  items-center  text-amber-50"><button> Checkout</button></div>

        </>


    )
}
