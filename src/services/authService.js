import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth, hasFirebaseConfig } from "./firebase";

const USERS_KEY = "nes_tec_users";
const SESSION_KEY = "nes_tec_user";

const mapFirebaseUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    nombre: user.displayName || user.email?.split("@")[0] || "Usuario",
    email: user.email || ""
  };
};

const getLocalUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveLocalUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(SESSION_KEY);
  return user ? JSON.parse(user) : null;
};

export const registerUser = async ({ nombre, email, password }) => {
  if (hasFirebaseConfig && auth) {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    if (nombre) {
      await updateProfile(response.user, { displayName: nombre });
    }

    return {
      id: response.user.uid,
      nombre: nombre || response.user.displayName || "Usuario",
      email: response.user.email || email
    };
  }

  const users = getLocalUsers();
  const exists = users.find((user) => user.email === email);

  if (exists) {
    throw new Error("Ya existe un usuario con ese email");
  }

  const newUser = {
    id: Date.now().toString(),
    nombre,
    email,
    password
  };

  users.push(newUser);
  saveLocalUsers(users);

  const sessionUser = {
    id: newUser.id,
    nombre: newUser.nombre,
    email: newUser.email
  };

  saveSession(sessionUser);

  return sessionUser;
};

export const loginUser = async ({ email, password }) => {
  if (hasFirebaseConfig && auth) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(response.user);
  }

  const users = getLocalUsers();
  const user = users.find(
    (currentUser) => currentUser.email === email && currentUser.password === password
  );

  if (!user) {
    throw new Error("Email o contrasena incorrectos");
  }

  const sessionUser = {
    id: user.id,
    nombre: user.nombre,
    email: user.email
  };

  saveSession(sessionUser);

  return sessionUser;
};

export const logoutUser = async () => {
  if (hasFirebaseConfig && auth) {
    await signOut(auth);
    return;
  }

  clearSession();
};

export const subscribeToAuth = (callback) => {
  if (hasFirebaseConfig && auth) {
    return onAuthStateChanged(auth, (user) => {
      callback(mapFirebaseUser(user));
    });
  }

  callback(getCurrentUser());

  return () => {};
};
