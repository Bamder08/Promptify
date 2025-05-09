import { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(
        buttonRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
        "-=0.6"
      );

    return () => tl.kill();
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-start items-center text-center px-4 pt-40">
      <h1
        ref={titleRef}
        className="text-4xl md:text-7xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Crea mejores prompts para IA con Promptify
      </h1>
      <p
        ref={subtitleRef}
        className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl"
      >
        Una herramienta que te ayuda a generar prompts efectivos,
        rápidos y adaptados a cualquier asistente de inteligencia artificial.
      </p>
      <button
        ref={buttonRef}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg transition"
      >
        Empezar ahora
      </button>
    </section>
  );
}

export default Hero;
