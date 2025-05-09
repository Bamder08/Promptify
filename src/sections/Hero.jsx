function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Crea mejores prompts para IA con Promptify
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
        Una herramienta que te ayuda a generar prompts efectivos, rápidos y
        adaptados a cualquier asistente de inteligencia artificial.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg transition">
        Empezar ahora
      </button>
    </section>
  );
}

export default Hero;
