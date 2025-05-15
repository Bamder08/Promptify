import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Guarda un prompt en Firestore bajo el usuario autenticado.
 */
export const savePromptToFirestore = async ({ userId, input, output, model }) => {
  try {
    const promptsRef = collection(db, "users", userId, "prompts");
    await addDoc(promptsRef, {
      input,
      output,
      model,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error guardando el prompt en Firestore:", error);
    throw error;
  }
};