import { useEffect, useRef } from "react";
import gsap from "gsap";

function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    
    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .fromTo(stepsRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 }, "-=0.6");

    return () => tl.kill();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 px-4 bg-gray-900 text-white text-center">
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Cómo Funciona
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {["Genera prompts precisos.", "Personaliza para cada IA.", "Optimiza resultados rápidamente."].map((text, index) => (
          <div key={index} ref={el => (stepsRef.current[index] = el)} className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <p className="text-xl font-semibold text-gray-200">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;