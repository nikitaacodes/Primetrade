import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("login"); 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:7777/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:7777/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setProfile(null);
      setPage("login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  //a simple loader
  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Navbar */}
      {profile && (
        <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
          <h1 className="text-xl font-bold text-blue-400">MyApp Notes</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">@{profile.userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        {profile ? (
          <Dashboard />
        ) : page === "login" ? (
          <Login onSwitch={() => setPage("signup")} />
        ) : (
          <Signup onSwitch={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}

export default App;
