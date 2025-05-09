import Benefits from "./sections/Benefits";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";

function App() {
  return (
    <main className="bg-[#0f172a] text-white">
      <Hero />
      <HowItWorks />
      <Benefits />
      <Contact />
    </main>
  );
}

export default App;