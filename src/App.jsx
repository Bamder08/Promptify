import Benefits from "./sections/Benefits";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Footer from "./sections/Footer";

function App() {
  return (
    <main className="bg-[#0f172a] text-white">
      <Hero />
      <HowItWorks />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;