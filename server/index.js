const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/grocerydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  mobile: String,
  name: String,
  place: String,
  password: String,
});

const orderSchema = new mongoose.Schema({
  user: String,
  items: Array,
});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

// 🧪 Signup – Always Success for Testing
app.post("/signup", async (req, res) => {
  const { mobile, name, place, password } = req.body;
  console.log("🔧 Signup called with:", req.body);
  // Optionally save to DB
  try {
    await new User({ mobile, name, place, password }).save();
  } catch (err) {
    console.log("Note: Duplicate or error, skipping save.");
  }
  return res.send({ success: true });
});

// 🧪 Login – Always Success for Testing
app.post("/login", async (req, res) => {
  const { mobile } = req.body;
  console.log("🔧 Login called with:", req.body);
  // Fake user name generation for demo
  const user = await User.findOne({ mobile });
  return res.send({ success: true, name: user ? user.name : "Guest" });
});

// ✅ Place Order
app.post("/order", async (req, res) => {
  try {
    const { items, user } = req.body;
    if (!items?.length || !user) {
      return res.send({ success: false, message: "Invalid order" });
    }

    await new Order({ items, user }).save();
    res.send({ success: true });
  } catch (err) {
    console.error("❌ Order error:", err);
    res.send({ success: false, message: "Unexpected error" });
  }
});

// ✅ Get Orders
app.get("/orders/:username", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.username });
    res.send(orders);
  } catch (err) {
    console.error("❌ Orders fetch error:", err);
    res.send([]);
  }
});

// 🧪 Clear All Orders
app.delete("/clear-orders", async (req, res) => {
  try {
    await Order.deleteMany({});
    console.log("🧹 All orders cleared");
    res.send({ success: true });
  } catch (err) {
    console.error("❌ Error clearing orders:", err);
    res.send({ success: false });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
