import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Cart = () => {
    const [cart, setcart] = useState(null)
    const [cartSuccess, setcartSuccess] = useState(false)
    const [quantity, Updatedquantity] = useState()
    let increase = 0;

    //This is for the increasing the quantity 
    const increaseQuantity = async (productId) => {
        const token = localStorage.getItem("token ")
        try {
            const response = axios.put(`https://shoe-store-h5gu.onrender.com/cart/increase${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        }
        catch (err) {
            console.log(err)
        }
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
            <div className="cartDiv h-full w-[50%] flex flex-col gap-6 font-bold ">
                {

                    cart?.items && cart.items.length > 0 ? (
                        cart?.items?.map((item) => (
                            <div key={item._id}>
                                <p>
                                    {item.product.title}
                                </p>
                                <p>
                                    {item.product.image}
                                </p>
                                <p>
                                    Price: ₹{item.product.price}
                                </p>

                                <div className='quantity-heading flex gap-4' >
                                    Quentity
                                    <div className="marks flex gap-4 ">
                                        <p className='text-xl cursor-pointer  '> - </p>
                                        <p className='quantity'>{item.quantity + increase} </p>
                                        <p onClick={() => increaseQuantity(item.product._id)} className='text-xl cursor-pointer ' >+</p>

                                    </div>
                                </div>
                            </div>

                        ))) : (
                        <p>OOPS!! Empty cart </p>
                    )
                }
            </div>
        </>


    )
}
