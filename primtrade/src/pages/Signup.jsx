import React, { useState } from "react";

const Signup = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    emailId: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7777/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg w-80 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.emailId}
          onChange={(e) =>
            setFormData({ ...formData, emailId: e.target.value })
          }
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-green-500 w-full py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-3 text-sm text-gray-400">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-blue-400 underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
