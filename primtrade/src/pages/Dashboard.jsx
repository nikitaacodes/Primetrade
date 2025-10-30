import React, { useState, useEffect } from "react";
import Note from "../components/Note";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:7777/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-6 w-full max-w-5xl">
      <div className="flex flex-row gap-6 bg-gray-800 rounded-xl p-4 shadow-lg">
        {/* Profile Section */}
        <div className="w-1/3 bg-gray-700 rounded-xl p-4 flex flex-col items-center">
          {profile ? (
            <>
              <img alt="avatar" className="w-20 h-20 border rounded-full mb-3" />
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-300">@{profile.userName}</p>
              <p className="text-sm text-gray-400 mt-2">{profile.emailId}</p>
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
