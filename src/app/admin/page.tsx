"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  instagram: string;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // check login
  useEffect(() => {
    if (localStorage.getItem("admin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  // fetch users only if admin
  useEffect(() => {
    if (!isAdmin) return;

    fetch("http://localhost:3000/api/form")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAdmin]);

  const handleLogin = () => {
    if (password === "ArtlStudio_Form_Admin2026") {
      localStorage.setItem("admin", "true");
      setIsAdmin(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    setPassword("");
  };

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070E19] text-white">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-white/20 mb-4"
          />

          {error && (
            <p className="text-red-400 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#070E19]">
        Loading...
      </div>
    );
  }

  /* ---------------- ADMIN DASHBOARD ---------------- */
  return (
    <div className="min-h-screen bg-[#070E19] text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6"
          >
            {/* Image */}
            <img
              src={`http://localhost:3000/api/form/${user._id}/image`}
              alt="User"
              className="w-32 h-32 object-cover rounded-xl bg-black"
            />

            {/* Info */}
            <div className="space-y-1">
              <p className="font-semibold text-lg">
                {user.firstName} {user.middleName} {user.lastName}
              </p>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400">{user.phone}</p>
              <p className="text-xs text-gray-500">{user._id}</p>
              <p className="text-gray-400">
                Birth Date:{" "}
                {new Date(user.birthDate).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-400">
                Instagram: @{user.instagram}
              </p>
              <p className="text-xs text-gray-500">
                Submitted:{" "}
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
