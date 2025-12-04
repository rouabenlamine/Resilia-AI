// src/utils/auth.js
const USERS_KEY = "resilia_users_v1";
const SESSION_KEY = "resilia_session_v1";

export function registerUser(userData) {
  const { email, password, name, surname, username, age, gender } = userData;
  
  if (!email || !password) {
    return { success: false, message: "Email et mot de passe requis." };
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const normalized = email.trim().toLowerCase();
  
  if (users.some(u => u.email === normalized)) {
    return { success: false, message: "Cet email est déjà utilisé." };
  }

  // Save user with all profile data
  const newUser = {
    email: normalized,
    password,
    name: name || "",
    surname: surname || "",
    username: username || "",
    age: age || 13,
    gender: gender || "",
    bio: "",
    goals: "",
    emergencyContact: "",
    profilePhoto: null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  console.log("User registered:", newUser); // Debug log
  
  return { success: true, message: "Compte créé avec succès." };
}

export function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const normalized = (email || "").trim().toLowerCase();
  
  const user = users.find(u => u.email === normalized && u.password === password);
  
  if (!user) {
    return { success: false, message: "Email ou mot de passe incorrect." };
  }
  
  // Save full user data in session (not just email)
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  
  console.log("User logged in:", user); // Debug log
  
  return { success: true, message: "Connexion réussie." };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  const user = session ? JSON.parse(session) : null;
  
  console.log("Current user:", user); // Debug log
  
  return user;
}

export function updateUserProfile(updatedData) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, message: "Aucun utilisateur connecté." };
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  
  // Find and update user
  const userIndex = users.findIndex(u => u.email === currentUser.email);
  
  if (userIndex === -1) {
    return { success: false, message: "Utilisateur introuvable." };
  }

  // Merge updated data with existing user data
  const updatedUser = {
    ...users[userIndex],
    ...updatedData,
    email: users[userIndex].email, // Keep email unchanged
    password: users[userIndex].password // Keep password unchanged
  };
  
  users[userIndex] = updatedUser;

  // Save back to localStorage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
  
  console.log("Profile updated:", updatedUser); // Debug log
  
  return { success: true, message: "Profile updated" };
}