import { collection, getDocs, deleteDoc, doc, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Obtener todos los prompts de un usuario
export async function getUserPrompts(uid) {
  try {
    const promptsRef = collection(db, "users", uid, "prompts");
    const snapshot = await getDocs(promptsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo prompts:", error);
    return [];
  }
}

// Eliminar un prompt específico
export const deletePrompt = async (uid, promptId) => {
  try {
    const ref = doc(db, `users/${uid}/prompts/${promptId}`);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Error al eliminar el prompt:", error);
  }
};

// Eliminar todos los prompts del usuario
export const deleteAllPrompts = async (uid) => {
  try {
    const ref = collection(db, "users", uid, "prompts");
    const snapshot = await getDocs(ref);
    const deletes = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletes);
  } catch (error) {
    console.error("Error al borrar todo el historial:", error);
  }
};

// Guardar un nuevo prompt
export const savePromptToFirestore = async (uid, promptData) => {
  try {
    const ref = collection(db, "users", uid, "prompts");
    await addDoc(ref, {
      ...promptData,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error al guardar el prompt:", error);
  }
};