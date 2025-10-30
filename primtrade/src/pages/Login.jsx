import React, { useState } from "react";

const Login = ({ onSwitch }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7777/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailId, password }),
      });
      if (res.ok) {
        window.location.reload(); 
      } else {
        const err = await res.json();
        alert(err.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg w-80 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-3 text-sm text-gray-400">
        Don’t have an account?{" "}
        <button onClick={onSwitch} className="text-blue-400 underline">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
