import { Routes, Route } from "react-router-dom";
import Benefits from "./sections/Benefits";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Footer from "./sections/Footer";
import PromptifyApp from "./pages/PromptifyApp";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  const { user } = useAuth();

  return (
    <div className="bg-[#0f172a] text-white">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <HowItWorks />
              <Benefits />
              <Contact />
            </>
          }
        />
        <Route path="/app" element={user ? <PromptifyApp /> : <Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;