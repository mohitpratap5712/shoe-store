import axios from "axios";
import { useEffect, useState } from "react";

const AdminPanel = () => {

  const [orders, setOrders] = useState([]);

  const [product, setProduct] = useState({
    title: "",
    price: ""
  });


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
        "http://localhost:3000/data",
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
        "http://localhost:3000/orders",
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
            type="submit"
            value="submit"
          />

        </form>

      </div>

    </div>
  );
};

export default AdminPanel;