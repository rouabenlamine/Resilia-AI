import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import { loginUser } from "../utils/auth";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    const res = loginUser({ email, password });
    setLoading(false);

    if (res.success) {
      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate("/home"), 900);
    } else {
      setMessage({ type: "error", text: res.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-300 to-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-200"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-2">
          Welcome back to Resilia AI
        </h1>
        <p className="text-center text-slate-600 mb-6">
          Reconnect with your calm mind 🌙
        </p>

        {message && (
          <div
            className={`mb-4 text-center p-3 rounded-md ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-indigo-100 text-blue-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-xl py-2 mt-2 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
