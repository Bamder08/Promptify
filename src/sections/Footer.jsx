import { FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateToSection = (sectionId) => {
    if (location.pathname === "/") {
      // Ya estás en la landing → scroll directo
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Estás en otra página → navega a "/" y espera que cargue
      navigate("/", { replace: false });

      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); 
    }
  };

  return (
    <footer className="bg-gray-800 text-gray-300 px-6 py-10 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo + descripción */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">Promptify</h2>
          <p className="text-sm text-gray-400 max-w-sm">
            Crea, organiza y mejora tus prompts de IA con nuestra herramienta
            intuitiva y poderosa.
          </p>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            <h3 className="text-white font-semibold mb-3">Enlaces útiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavigateToSection("home")} className="hover:text-white">
      Inicio
    </button>
              </li>
              <li>
                <button onClick={() => handleNavigateToSection("characters")} className="hover:text-white">
      Características
    </button>
              </li>
              <li>
                <button onClick={() => handleNavigateToSection("contact")} className="hover:text-white">
      Contacto
    </button>
              </li>
            </ul>
          </div>

          {/* Redes con iconos */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/Bamder08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#7E5BEF]"
                >
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mateo-mart%C3%ADnez-92205b336/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#7E5BEF]"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaMapMarkerAlt /> Barranquilla, Colombia
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Promptify. Todos los derechos reservados.
      </div>
    </footer>
  );
}
