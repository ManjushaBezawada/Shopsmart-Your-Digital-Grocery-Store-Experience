// 📁 client/src/components/Home.js

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles.css';

const products = [
  {
    id: 1,
    name: "Basmati Rice",
    price: 120,
    model: "1kg Pack",
    image: "/images/rice.jpg",
  },
  {
    id: 2,
    name: "Toor Dal",
    price: 95,
    model: "1kg Pack",
    image: "/images/toordal.jpg",
  },
  {
    id: 3,
    name: "Wheat Flour",
    price: 80,
    model: "1kg Bag",
    image: "/images/wheatflour.jpg",
  },
  {
    id: 4,
    name: "Sunflower Oil",
    price: 180,
    model: "1L Bottle",
    image: "/images/oil.jpg",
  },
  {
    id: 5,
    name: "Salt",
    price: 20,
    model: "1kg Pack",
    image: "/images/salt.jpg",
  },
  {
    id: 6,
    name: "Sugar",
    price: 45,
    model: "1kg Pack",
    image: "/images/sugar.jpg",
  },
  {
    id: 7,
    name: "Milk",
    price: 55,
    model: "1L Packet",
    image: "/images/milk.jpg",
  },
  {
    id: 8,
    name: "Tomatoes",
    price: 40,
    model: "1kg",
    image: "/images/tomatoes.jpg",
  },
  {
    id: 9,
    name: "Potatoes",
    price: 35,
    model: "1kg",
    image: "/images/potatoes.jpg",
  },
  {
    id: 10,
    name: "Bananas",
    price: 60,
    model: "1 Dozen",
    image: "/images/bananas.jpg",
  },
  {
    id: 11,
    name: "Green Tea",
    price: 150,
    model: "250g Box",
    image: "/images/greentea.jpg",
  },
  {
    id: 12,
    name: "Apples",
    price: 160,
    model: "1kg",
    image: "/images/apples.jpg",
  }
];

const Home = ({ cart, setCart, user }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert("✅ Added to Cart: " + product.name);
  };

  const buyNow = async (product) => {
    try {
      await axios.post("http://localhost:5000/order", {
        items: [product],
        user: user?.name || "guest",
      });
      alert("✅ Order placed for: " + product.name);
      navigate("/orders", { state: { user: user?.name || "guest" } });
    } catch {
      alert("⚠️ Server error while placing order.");
    }
  };

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product.id}>
          <div className="card product-card h-100 shadow-sm">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{product.name}</h5>
              <p>{product.model}</p>
              <p>₹{product.price}</p>
              <button className="btn btn-success m-1 btn-animate" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button className="btn btn-warning m-1 btn-animate" onClick={() => buyNow(product)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
