import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const savePromptToFirestore = async ({ userId, input, output, model }) => {
  if (!input || !output || !model || !userId) {
    console.warn("❌ Datos inválidos. No se guardará en Firestore.");
    return;
  }

  try {
    const promptsRef = collection(db, "users", userId, "prompts");
    await addDoc(promptsRef, {
      input,
      output,
      model,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Guardado en Firestore");
  } catch (error) {
    console.error("🔥 Error guardando el prompt en Firestore:", error);
  }
};