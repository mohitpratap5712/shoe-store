import mongoose, { trusted } from "mongoose";

const Cartschema = new mongoose.Schema(
    {
        user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User",
             require:true
        },
        items:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    require:true   
                },
                quantity :{
                    type : Number,
                    default:1,
                    min:1,
                }
            }
        ]

    },
    {
        timestamps:true,
    }

)
 const Cart = mongoose.model("Cart" , Cartschema)
 export default Cart



 