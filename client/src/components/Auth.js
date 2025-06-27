import React, { useState } from "react";
import axios from "axios";

const Auth = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    mobile: "",
    name: "",
    place: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? "/login" : "/signup";
    const payload = isLogin
      ? { mobile: form.mobile, password: form.password }
      : form;

    try {
      const res = await axios.post("http://localhost:5000" + url, payload);

      if (res.data.success) {
        const userName = isLogin ? res.data.name : form.name;

        alert(isLogin ? "✅ Logged in!" : "✅ Registered!");

        // Save to local storage
        localStorage.setItem("username", userName);

        // Set user state (optional chaining to avoid error)
        if (setCurrentUser) {
          setCurrentUser({ name: userName, mobile: form.mobile });
        }

        // Optional: Reset form
        setForm({ mobile: "", name: "", place: "", password: "" });
      } else {
        alert("❌ " + (res.data.message || "Please try again."));
      }

    } catch (err) {
      console.error("❌ Server connection error:", err);
      alert("❌ Unable to connect to server. Please try again.");
    }
  };

  return (
    <div className="card p-4 shadow w-50 mx-auto mt-5">
      <h4 className="text-center mb-4">{isLogin ? "Login" : "Signup"}</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required={!isLogin}
        />
        {!isLogin && (
          <input
            className="form-control mb-2"
            placeholder="Location"
            name="place"
            value={form.place}
            onChange={handleChange}
            required
          />
        )}
        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100 btn-animate" type="submit">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <button
        className="btn btn-link mt-3"
        onClick={() => {
          setIsLogin(!isLogin);
          setForm({ mobile: "", name: "", place: "", password: "" });
        }}
      >
        {isLogin ? "New user? Signup" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;
