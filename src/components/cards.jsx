import { useState } from "react";

export const Cards = ({ quantity, image, title, price, handleclick, disabled, productId ,addToCart }) => {

  return (
    <div className="h-full w-56 rounded-xl flex flex-col items-center">
      {image && (
        <img
          className="w-full h-[65%]"
          src={image}
          alt={title}
        />
      )}
      <div className="w-full h-[45%] p-1 bg-white text-xl text-black flex flex-col items-center">
        <b>{title}</b>

        <div className="price text-red-500">{price}</div>
        <div className="cart bg-blue-400 w-full flex justify-center align-middle rounded my-3 " >
          <button
        onClick={()=>{
          addToCart(
            productId,
            1
          )
        }}
        >Add to cart</button></div>

        <div className={` w-full h-8 bg-green-400 m-5 flex justify-center items-center rounded-md
          `}>
          <button
            disabled={disabled}
            onClick={() =>


              handleclick({
                productId,
                title,
                price: price,
                image: image,
              })
            }
          >
            {disabled ? "ordered" : " buy now "}
          </button>
        </div>
      </div>
    </div>
  );
};