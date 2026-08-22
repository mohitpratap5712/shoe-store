import { useState } from "react";

export const Cards = ({ image, title, price, handleclick , disabled , productId }) => {


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

        <div className={ ` w-full h-8 bg-green-400 m-5 flex justify-center items-center rounded-md
        ${disabled && "bg-red-600"}
          `}>
          <button
          disabled = {disabled}
            onClick={() => 
              
              handleclick({
                productId,
                title,
                price: price,
                image: image,
              })
            }
          >
            {disabled? "ordered"  : " buy now "}
            </button>
        </div>
      </div>
    </div>
  );
};