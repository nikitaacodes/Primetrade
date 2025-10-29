import React, { useState, useEffect } from "react";
import Note from "../components/Note";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  // Fetch logged-in user's profile
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:7777/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) setProfile(data);
      else console.error("Failed to fetch profile:", data.message);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:7777/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login"; // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white p-4">
      <div className="flex flex-row gap-6 bg-gray-800 rounded-xl p-4 shadow-lg">
        {/* Profile Section */}
        <div className="w-1/3 bg-gray-700 rounded-xl p-4 flex flex-col items-center">
          {profile ? (
            <>
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                alt="avatar"
                className="w-20 h-20 rounded-full mb-3"
              />
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-300">@{profile.userName}</p>
              <p className="text-sm text-gray-400 mt-2">{profile.emailId}</p>

              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Notes Section */}
        <div className="w-2/3">
          <Note />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
