import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observar cambios de sesión
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Login con Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  // Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}