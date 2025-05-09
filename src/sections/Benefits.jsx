import { useEffect, useRef } from "react";
import gsap from "gsap";

function Benefits() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    ).fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
      "-=0.4"
    );

    return () => tl.kill();
  }, []);

  const benefits = [
    "Ahorra tiempo generando prompts efectivos al instante.",
    "Mejora la calidad de tus respuestas de IA.",
    "Evita pruebas y errores innecesarios con sugerencias inteligentes."
  ];

  return (
    <section id="benefits" ref={sectionRef} className="py-16 px-6 bg-[#0f172a] text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Beneficios de usar Promptify
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((text, index) => (
          <div
            key={index}
            ref={el => (cardsRef.current[index] = el)}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <p className="text-lg text-gray-100">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;