# Promptify – Generador de Prompts para IA

Promptify es una aplicación **full‑stack** que ayuda a redactorxs, marketers y devs a construir prompts de alta calidad para asistentes de IA (GPT‑3.5 / GPT‑4, Gemini, etc.).
Combina un frontend moderno y animado con un backend Node/Express que consume la API de OpenAI y persiste el historial de cada usuari@ en Firebase Firestore.

---

## ⚡ Highlights

| Función                      | Detalles                                                      |
| ---------------------------- | ------------------------------------------------------------- |
| ✨ **Generación de prompts**  | Soporta GPT‑3.5 y GPT‑4 (backend Node + OpenAI SDK).          |
| 🔒 **Auth Google**           | Firebase Auth + RTK Query; login / logout en un clic.         |
| 💾 **Historial persistente** | Firestore por usuario, con CRUD (eliminar individual o todo). |
| 📱 **Responsive first**      | Grid + Tailwind; sidebar colapsable en móvil.                 |
| 🎬 **Animaciones pro**       | Framer Motion + GSAP para transiciones fluidas.               |
| 📨 **Contacto real**         | EmailJS con variables de entorno (sin exponer keys).          |
| 🛡 **Rate‑limit diario**     | Límite de uso lado cliente + servidor (evita abuso).          |

---

## 🛠 Tecnologías principales

| Frontend                | Backend / Infra           | Dev Experience      |
| ----------------------- | ------------------------- | ------------------- |
| React 18 + Vite         | Node 18 / Express         | ESLint + Prettier   |
| Tailwind CSS v3         | OpenAI SDK                | Husky + lint‑staged |
| Framer Motion & GSAP    | Firebase Auth + Firestore | Vitest (unit)       |
| Headless UI + Heroicons | Cors / Dotenv             | React Hot Toast     |
| React Router 6          | Render (deploy)           | Git Hooks           |
| React Icons             | EmailJS                   | CI GitHub Actions   |

---

## 🚀 Deploy

> **[https://promptify-three.vercel.app/](https://promptify-three.vercel.app/)**

(Si aparece *“límite diario alcanzado”* usa otra cuenta Google o vuelve mañana 😉).


## 🏁 Instalación local

```bash
# 1. Clona el repo
git clone https://github.com/tu-usuario/promptify.git
cd promptify

# 2. Instala dependencias
npm install

# 3. Crea .env
cp .env.example .env
#  └─ Rellena claves Firebase, OpenAI y EmailJS

# 4. Inicia modo dev (frontend + backend)
npm run dev         # Vite
npm run server      # Express (puerto 3001)
```

---

## 🔑 Variables de entorno (.env)

| Clave                     | Descripción                              |
| ------------------------- | ---------------------------------------- |
| `VITE_FIREBASE_API_KEY`   | Credencial pública de Firebase           |
| `VITE_EMAILJS_PUBLIC_KEY` | Key pública de EmailJS                   |
| `OPENAI_API_KEY`          | **Solo backend** – key secreta de OpenAI |


## 🗺️ Roadmap

* [x] Autenticación con Google
* [x] Historial CRUD (Firestore)
* [x] Animaciones avanzadas
* [x] Límite diario configurable

---

## 💌 Contacto

**Mateo Martínez Herrera** – Full‑Stack Developer (Frontend focus)
[LinkedIn](https://www.linkedin.com/in/mateo-martínez-92205b336/) · [GitHub](https://github.com/Bamder08) · Barranquilla, Colombia

¿Te interesa colaborar o contratar? Escríbeme: **[mateo8mh@gmail.com](mailto:mateo8mh@gmail.com)**

---

> *Built with passion & caffeine ☕ © 2025*