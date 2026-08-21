import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import auth from "./middleware/auth.js";
import isAdmin from "./middleware/admin.js";
import Product from "./models/product.js";
import User from "./models/User.js";
import Order from "./models/orderSchema.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;

// =======================
// Middleware
// =======================
app.use(
  cors({
    origin: "https://shoe-store-1-5r1i.onrender.com",
    credentials: true,
  })
);
app.use(express.json());


const JWT_SECRET = "mysecretkey";

// =======================
// MongoDB Connection
// =======================
mongoose
  // .connect("mongodb://127.0.0.1:27017/shoestore")
  .connect (process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database Altroz Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ Database Error");
    console.log(err);
  });

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

// =======================
// Add Product
// =======================
app.post("/data", auth, isAdmin, async (req, res) => {
  try {
    console.log(req.body);

    const product = new Product(req.body);


    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Saved Successfully",
      product,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

// =======================
// Register User
// =======================



app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//protected route
app.get("/profile", auth, (req, res) => {

  res.json({

    success: true,

    message: "Welcome to Profile",

    user: req.user

  });

});

// tere yha pe lere
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = () => {
      if (password === user.password) {
        return true
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    console.log("user found")

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,

      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }

    );




    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    }


    );


  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
app.post("/orders", auth, async (req, res) => {

  try {
    console.log("ORDER BODY:", req.body);

    const { productId, quantity } = req.body;

    console.log("PRODUCT ID:", productId);
    console.log("QUANTITY:", quantity);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const order = new Order({
      user: req.user.id,
      product: productId,
      quantity: quantity,
      price: product.price,
      finalPrice: product.price * quantity
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });
  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "can't upload the data"
    });

  }

});
app.get("/orders", auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("product", "title price image")

    if (!orders) {
      return res.status(404).json({
        sucess: false,
        message: "no order found"

      })
    }

    res.status(200).json({
      success: true,
      orders,

    })
  }


  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "can't upload the data"
    });
  }
});



// =======================
// Get All Users (Optional)
// =======================
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome Boss let's start",
    user: req.user,

  })
})
app.put("/products/:id", auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const productUpdated = await Product.findByIdAndUpdate(

      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }

    )

    if (!productUpdated) {
      res.status(404).json({
        success: false,
        message: "Product not found ",
        id,
      })
    }

    res.status(200).json({
      success: true,
      message: "product is updated ",
      product: productUpdated,

    })

  }
  catch (err) {
    console.log(err)
  }
})
//Delete the product 
app.delete("/products/:id", auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      product: deletedProduct,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



//products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
