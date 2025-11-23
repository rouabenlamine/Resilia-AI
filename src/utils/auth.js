// src/utils/auth.js
const USERS_KEY = "resilia_users_v1";
const SESSION_KEY = "resilia_session_v1";

export function registerUser({ email, password }) {
  if (!email || !password) return { success: false, message: "Email et mot de passe requis." };

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const normalized = email.trim().toLowerCase();
  if (users.some(u => u.email === normalized)) {
    return { success: false, message: "Cet email est déjà utilisé." };
  }

  users.push({ email: normalized, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true, message: "Compte créé avec succès." };
}

export function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const normalized = (email || "").trim().toLowerCase();
  const user = users.find(u => u.email === normalized && u.password === password);
  if (!user) return { success: false, message: "Email ou mot de passe incorrect." };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email }));
  return { success: true, message: "Connexion réussie." };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}
