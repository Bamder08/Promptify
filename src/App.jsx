import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Benefits from "./sections/Benefits";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Footer from "./sections/Footer";
import PromptifyApp from "./pages/PromptifyApp";

function App() {
  return (
    <Router>
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
          <Route path="/app" element={<PromptifyApp />} />
        </Routes>

        {/* Footer SIEMPRE visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;