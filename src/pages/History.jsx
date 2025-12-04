import React, { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function History() {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Load chat history from localStorage
    const storedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setHistoryData(storedHistory);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c4f0ed] via-[#c9f4e4] to-[#bef4d5] p-6 sm:p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 text-gray-700 font-medium mb-6 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      {/* History Container */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#b2f2c3]/50">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-8 h-8 text-[#b2f2c3]" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
            Conversation History
          </h2>
        </div>

        {historyData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <MessageCircle className="w-20 h-20 mx-auto text-[#b2f2c3] mb-4 opacity-50" />
            <p className="text-gray-600 text-lg mb-2">No conversation history yet</p>
            <p className="text-gray-500 text-sm">
              Start chatting with Resilia to see your conversations here
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-[#b2f2c3] to-[#bef4d5] text-gray-800 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Start a Conversation
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {historyData.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="group relative bg-gradient-to-br from-[#c4f0ed] via-[#c9f4e4] to-[#bef4d5] rounded-2xl p-5 border-2 border-transparent hover:border-[#b2f2c3] transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  {/* Mood Emoji */}
                  <div className="text-4xl flex-shrink-0">{entry.mood}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition">
                      {entry.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {entry.preview}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full">
                        <Calendar className="w-3 h-3" />
                        <span>{entry.date}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>{entry.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}