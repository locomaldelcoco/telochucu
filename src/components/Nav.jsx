export function Nav() {
  return (
  <nav className="bg-white shadow-md w-64 flex flex-col p-6">

      {/* Contenedor de links en el 30% superior */}
      <div className="h-[30%] flex flex-col justify-between">
        <a href="/" className="text-gray-900 p-4 hover:text-white rounded-3xl text-center hover:bg-sky-700">Inicio</a>
        <a href="/about" className="text-gray-900 p-4 hover:text-white rounded-3xl text-center hover:bg-sky-700">Telos en oferta</a>
        <a href="/contact" className="text-gray-900 p-4 hover:text-white rounded-3xl text-center hover:bg-sky-700">Nosotros</a>
        <a href="/login" className="text-gray-900 p-4 hover:text-white rounded-3xl text-center hover:bg-sky-700">Iniciar Sesion</a>
      </div>
    </nav>
  )
}
