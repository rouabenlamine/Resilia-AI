import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  const affirmations = [
    "You are stronger than your anxious thoughts 🌿",
    "Every breath is a fresh start 🌤️",
    "Healing takes time, and that’s perfectly okay 💙",
    "You are doing better than you think 💫",
    "Peace begins with accepting how you feel 💧",
    "Your emotions matter — always 🌸",
  ];

  const [quote, setQuote] = useState(affirmations[0]);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      setQuote(affirmations[randomIndex]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-100 text-blue-600 relative">
      <Navbar />

      {/* Main content */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-blue-500"
        >
          Welcome to <span className="text-sky-600">Resilia AI</span>
        </motion.h1>

        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-lg text-slate-700 italic bg-white/70 px-6 py-4 rounded-2xl shadow-sm max-w-lg"
        >
          “{quote}”
        </motion.p>
      </section>

      {/* Floating Chatbot Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-20 right-8"
      >
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-br from-blue-100 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Chat popup */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-36 right-8 bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-4 w-72"
          >
            <h3 className="text-lg font-semibold text-blue-700">
              Hi, I’m <span className="text-sky-600">Resilia</span> 
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Your personal mental health assistant.  
              How can I help you today?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="text-center py-5 text-slate-500 text-sm border-t border-blue-100 bg-white/50 backdrop-blur-sm">
        © {new Date().getFullYear()} Resilia AI — Caring for your mind and heart 💙
      </footer>
    </div>
  );
}
