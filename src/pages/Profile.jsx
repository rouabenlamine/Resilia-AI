import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUserProfile } from "../utils/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(13);
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [goals, setGoals] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [message, setMessage] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user.username || "");
      setName(user.name || "");
      setSurname(user.surname || "");
      setEmail(user.email || "");
      setAge(user.age || 13);
      setGender(user.gender || "");
      setBio(user.bio || "");
      setGoals(user.goals || "");
      setEmergencyContact(user.emergencyContact || "");
      setProfilePhoto(user.profilePhoto || null);
    } else {
      // If no user logged in, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const result = updateUserProfile({
      username,
      name,
      surname,
      age,
      gender,
      bio,
      goals,
      emergencyContact,
      profilePhoto
    });
    
    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c4f0ed] via-[#c9f4e4] to-[#bef4d5] p-6 sm:p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 text-gray-700 font-medium mb-6 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      {/* Profile Container */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#b2f2c3]/50">
        <h1 className="text-3xl font-bold text-[#66CDAA] mb-8 text-center">My Profile</h1>
        
        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 text-center p-3 rounded-xl ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-[#b2f2c3]/30 text-gray-700"
            }`}
          >
            {message.text}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-[#b2f2c3]/20 rounded-full overflow-hidden border-2 border-[#b2f2c3] shadow-inner">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-[#b2f2c3] text-3xl">
                  📷
                </div>
              )}
            </div>
            <label className="cursor-pointer px-4 py-2 bg-white/50 text-gray-700 rounded-lg text-sm hover:bg-white/70 transition border border-[#b2f2c3]/30">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Details Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 bg-gray-100 text-gray-500 cursor-not-allowed"
                title="Email cannot be changed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mental Health Goals</label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
                placeholder="What are your goals?"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#b2f2c3]/50 focus:outline-none focus:ring-2 focus:ring-[#b2f2c3] bg-white/50 text-gray-800"
                placeholder="Phone number or email"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-[#b2f2c3] to-[#bef4d5] hover:from-[#a0e5b1] hover:to-[#ace5c3] text-gray-800 font-semibold rounded-xl transition shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}