import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Moon,
  Sun,
  Coffee,
  Wind,
  Menu,
  History,
  User,
  BarChart3,
  LogOut,
} from "lucide-react";
import { getCurrentUser, logoutUser } from "../utils/auth";
import logo from '../assets/resilia-logo.png';

const Logo = ({ className = "" }) => (
  <div className={`font-bold text-3xl flex items-center gap-3 ${className}`}>
    <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center overflow-hidden">
      <img src={logo} alt="Resilia Logo" className="w-full h-full object-contain" />
    </div>
    <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
      Resilia AI
    </span>
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load current user
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const affirmations = [
    "You are stronger than your anxious thoughts 🌿",
    "Every breath is a fresh start 🌤️",
    "Healing takes time, and that's perfectly okay 💙",
    "You are doing better than you think 💫",
    "Peace begins with accepting how you feel 💧",
    "Your emotions matter — always 🌸",
  ];

  const [quote, setQuote] = useState(affirmations[0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi ${currentUser?.name || 'there'}! I'm Resilia, your mental health companion. How are you feeling today?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  // Load chat history from localStorage
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Load chat history from localStorage
    const storedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    // Get the 3 most recent chats
    setChatHistory(storedHistory.slice(0, 3));
  }, []);

  const moods = [
    { emoji: "😢", label: "Struggling", color: "from-[#d4edf6] to-[#c4f0ed]" },
    { emoji: "😕", label: "Low", color: "from-[#c4f0ed] to-[#c9f4e4]" },
    { emoji: "😐", label: "Okay", color: "from-[#c9f4e4] to-[#bef4d5]" },
    { emoji: "🙂", label: "Good", color: "from-[#bef4d5] to-[#b2f2c3]" },
    { emoji: "😊", label: "Great", color: "from-[#b2f2c3] to-[#bef4d5]" },
  ];

  const quickTips = [
    { icon: Wind, text: "Take 3 deep breaths", color: "text-teal-600", bg: "bg-[#c4f0ed]" },
    { icon: Coffee, text: "Stay hydrated", color: "text-teal-700", bg: "bg-[#c9f4e4]" },
    { icon: Sun, text: "Get some sunlight", color: "text-emerald-600", bg: "bg-[#bef4d5]" },
    { icon: Moon, text: "Practice gratitude", color: "text-cyan-700", bg: "bg-[#d4edf6]" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      setQuote(affirmations[randomIndex]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I understand. It's completely normal to feel this way. Would you like to talk more about what's on your mind, or would you prefer some coping strategies?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleMoodSelect = (index) => {
    setSelectedMood(index);
    // Save mood to localStorage with timestamp
    const moodEntry = {
      mood: moods[index].label,
      emoji: moods[index].emoji,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moodHistory.unshift(moodEntry);
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  };

  if (!currentUser) {
    return null; // or a loading spinner
  }

  const displayName = currentUser.name || currentUser.username || "Friend";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c4f0ed] via-[#c9f4e4] to-[#bef4d5] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#c4f0ed] to-[#bef4d5] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#c4f0ed] to-[#c9f4e4] rounded-full blur-3xl"
        />
      </div>

      {/* Dynamic Navbar */}
      <nav className="relative bg-white/70 backdrop-blur-xl border-b border-[#b2f2c3]/30 shadow-sm px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/history" className="text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </Link>
            <Link to="/mental-health-trends" className="text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Trends
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#bef4d5] to-[#b2f2c3] text-gray-800 px-4 py-2 rounded-xl font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 pb-4 space-y-3">
              <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-left text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/50"
              >
                <History className="w-4 h-4" />
                History
              </Link>
              <Link
                to="/mental-health-trends"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-left text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/50"
              >
                <BarChart3 className="w-4 h-4" />
                Trends
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-left text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/50"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <button onClick={handleLogout} className="w-full text-left bg-gradient-to-r from-[#bef4d5] to-[#b2f2c3] text-gray-800 px-2 py-2 rounded-lg font-medium flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section with Dynamic Username */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <span className="text-4xl sm:text-5xl">👋</span>
            </motion.div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#008080] bg-clip-text ">
              Welcome back, {displayName}
            </h2>
          </div>
          <motion.div key={quote} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c4f0ed] via-[#c9f4e4] to-[#bef4d5] rounded-3xl blur-lg opacity-60"></div>
            <p className="relative text-lg sm:text-xl text-gray-700 font-medium italic bg-white/90 backdrop-blur-sm px-6 sm:px-8 py-5 sm:py-6 rounded-3xl shadow-xl border border-white/50">
              <Sparkles className="inline w-5 h-5 text-[#b2f2c3] mr-2" />
              {quote}
            </p>
          </motion.div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trends and Chat History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mental Health Insight */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-[#bef4d5] to-[#b2f2c3] rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Mental Health Insight
                </h3>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-4">
                <p className="text-3xl font-bold text-gray-800 mb-1">1 in 5</p>
                <p className="text-sm text-gray-700 font-medium">Adults experience mental illness annually</p>
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                Mental health awareness is growing. Remember, seeking help is a sign of strength, not weakness.
              </p>
              <Link
                to="/mental-health-trends"
                className="block text-center bg-white text-gray-800 px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition text-sm"
              >
                Explore More Trends
              </Link>
            </motion.div>

            {/* Chat History */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#b2f2c3]/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#66CDAA] bg-clip-text  flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#b2f2c3]" />
                  Recent Conversations
                </h3>
                <Link to="/history" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {chatHistory.length > 0 ? (
                  chatHistory.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      className="group relative bg-gradient-to-br from-[#c4f0ed] via-[#c9f4e4] to-[#bef4d5] rounded-2xl p-4 sm:p-5 cursor-pointer border-2 border-transparent hover:border-[#b2f2c3] transition-all overflow-hidden"
                      onClick={() => navigate("/history")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/10 group-hover:to-white/10 transition-all"></div>
                      <div className="relative flex items-start gap-4">
                        <div className="text-3xl sm:text-4xl">{chat.mood}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h4 className="font-bold text-gray-800 text-base sm:text-lg group-hover:text-gray-900 transition truncate">{chat.title}</h4>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full">{chat.date}</span>
                              <span className="text-xs text-gray-500">{chat.duration}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{chat.preview}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 mx-auto text-[#b2f2c3] mb-4" />
                    <p className="text-gray-600 mb-2">No conversations yet</p>
                    <p className="text-sm text-gray-500">Start chatting with Resilia to see your history here</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Daily Check-in */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative bg-gradient-to-br from-[#b2f2c3] via-[#bef4d5] to-[#c9f4e4] rounded-3xl p-6 sm:p-7 text-gray-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Daily Check-in</h3>
                </div>
                <p className="text-sm mb-5 text-gray-700">How are you feeling today?</p>
                <div className="grid grid-cols-5 gap-2">
                  {moods.map((mood, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoodSelect(i)}
                      className={`relative bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-2xl p-2 sm:p-3 text-2xl sm:text-3xl transition-all border-2 ${selectedMood === i ? "border-white shadow-lg" : "border-transparent"}`}
                    >
                      {mood.emoji}
                      {selectedMood === i && <motion.div layoutId="selected-mood" className="absolute inset-0 bg-white/20 rounded-2xl" />}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {selectedMood !== null && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 text-sm text-center font-medium bg-white/30 backdrop-blur-sm rounded-xl py-2">
                      Feeling {moods[selectedMood].label} today 💚
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#b2f2c3]/50">
              <h3 className="text-lg sm:text-xl font-bold text-[#20B2AA]  bg-clip-text  mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#20B2AA]" />
                Quick Wellness Tips
              </h3>
              <div className="space-y-3">
                {quickTips.map((tip, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ x: 4, scale: 1.02 }} className={`flex items-center gap-4 ${tip.bg} rounded-2xl p-4 cursor-pointer border-2 border-transparent hover:border-[#b2f2c3]/50 transition-all group`}>
                    <div className={`p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md transition`}>
                      <tip.icon className={`w-5 h-5 ${tip.color}`} />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition text-sm sm:text-base">{tip.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-600 text-white p-5 sm:p-6 rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all z-50 group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition" />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-teal-400/30 blur-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-white rounded-3xl shadow-2xl border-2 border-teal-200 z-50 flex flex-col overflow-hidden w-[90vw] sm:w-[420px] h-[80vh] sm:h-[650px]"
            role="dialog"
            aria-modal="true"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 text-white p-5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Resilia</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Always here for you
                  </p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition" aria-label="Close chat">
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#c4f0ed]/30 via-[#c9f4e4]/20 to-white">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-md ${msg.sender === "user" ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white" : "bg-white border-2 border-teal-100 text-slate-700"}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-2 ${msg.sender === "user" ? "text-teal-100" : "text-slate-400"}`}>{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border-2 border-teal-100 rounded-2xl px-5 py-4 shadow-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} animate={{ y: [-2, 2, -2], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="w-2.5 h-2.5 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            {/* Chat Input */}
            <div className="p-5 bg-gradient-to-r from-[#d4edf6] to-[#c9f4e4] border-t-2 border-teal-100 flex-shrink-0">
              <div className="flex gap-3">
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Share what's on your mind..." className="flex-1 px-5 py-3.5 rounded-2xl border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white shadow-sm text-sm" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSendMessage} className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-4 rounded-2xl hover:shadow-lg transition shadow-md" aria-label="Send message">
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative text-center py-8 text-gray-600 text-sm border-t border-white/30 bg-white/40 backdrop-blur-xl mt-16">
        <p className="font-medium">© {new Date().getFullYear()} Resilia AI — Caring for your mind and heart 💚</p>
      </footer>
    </div>
  );
}