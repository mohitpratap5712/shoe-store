import axios from "axios";
import { useEffect, useState } from "react";

const AdminPanel = () => {

  const [orders, setOrders] = useState([]);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image:""
  });

  //image handle 
  const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "shoe_store");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/bg8uljch/image/upload",
      formData
    );

    console.log("Cloudinary:", response.data);

    setProduct((prev) => ({
      ...prev,
      image: response.data.secure_url,
    }));

  } catch (error) {
    console.log(
      "Image upload error:",
      error.response?.data || error.message
    );
  }
};

  // Product input
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };



  // Add product
  const addProduct = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://shoe-store-h5gu.onrender.com/data",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

    } catch (error) {

      console.log(error.response?.data);

    }
  };


  // Get Orders
  const getOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://shoe-store-h5gu.onrender.com/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("ORDERS:", response.data);

      setOrders(response.data.orders);

    } catch (error) {

      console.log(error.response?.data);

    }
  };


  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div>

      <h1>Admin Panel</h1>


      {/* ORDERS */}

      <h2>All Orders</h2>
 <h4>{orders.length}</h4>
      {orders.map((order) => (


        <div key={order._id}>
          <img width={80} src={order.product?.image} alt="" />

          <h3>
            Order ID: {order._id}
          </h3>

          <p>
            Customer: {order.user?.name}
          </p>

          <p>
            Email: {order.user?.email}
          </p>

          <p>
            Product: {order.product?.title}
          </p>

          <p>
            Price: ₹{order.product?.price}
          </p>

          <p>
            Quantity: {order.quantity}
          </p>

          <hr />

        </div>

      ))}


      {/* ADD PRODUCT */}

      <div className="w-full h-20 flex justify-center align-middle bg-blue-400 font-black">

        <form onSubmit={addProduct}>

          <input
            type="text"
            name="title"
            value={product.title}
            placeholder="please enter product name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="price"
            value={product.price}
            placeholder="please enter product price"
            onChange={handleChange}
          />
          <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

          <input
            type="submit"
            value="submit"
          />

        </form>

      </div>

    </div>
  );
};

export default AdminPanel;