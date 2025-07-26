import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = () => {
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    axios.post(url, formData)
      .then((response) => {
        if (isLogin) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate("/");
        } else {
          alert("Registration successful! Please login.");
          setIsLogin(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 mb-4 border rounded"
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border rounded"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded"
          onChange={handleInputChange}
        />
        <button
          onClick={handleAuth}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer"
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
