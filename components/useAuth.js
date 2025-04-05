import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export const useAuth = () => {
  const signup = async (email, password, role) => {
    try {
      if (!auth) {
        throw new Error("Firebase Auth is not initialized");
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  return { signup };
};
