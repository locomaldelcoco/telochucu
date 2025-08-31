import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid con 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 justify-between justify-items-center content-start">

          
          {/* Redes Sociales con íconos y texto */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Redes Sociales</h3>
            <ul className="space-y-3 items-center">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <FaYoutube /> YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Soporte</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">Enviar ticket</a></li>
              <li><a href="#" className="hover:text-white">Documentación</a></li>
              <li><a href="#" className="hover:text-white">Guías</a></li>
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Compañía</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Empleos</a></li>
              <li><a href="#" className="hover:text-white">Prensa</a></li>
            </ul>
          </div>
        </div>

      </div>
      
        {/* Línea divisoria */}
         <div className="border-t border-gray-700 pt-6 flex items-center justify-center">
      <p className="text-sm mb-5 text-gray-400">
        © 2024 Telochucu - Todos los derechos reservados.
      </p>
    </div>
    </footer>
  );
}
