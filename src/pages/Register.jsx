import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { registerUser } from "../utils/auth";
import { motion } from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }
    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    if (password !== confirm) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setLoading(true);
    const res = registerUser({ email, password });
    setLoading(false);

    if (res.success) {
      setMessage({ type: "success", text: "Account created successfully!" });
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setMessage({ type: "error", text: res.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-sky-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md border border-sky-100"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-2">
          Create your Resilia account
        </h1>
        <p className="text-center text-slate-600 mb-6">
          Start your journey towards emotional balance 🌤️
        </p>

        {message && (
          <div
            className={`mb-4 text-center p-3 rounded-md ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-indigo-100 text-blue-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Retype password"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-xl py-2 mt-2 transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-700 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
