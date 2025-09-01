import './auth-styles.css'
export function Nav({ user, onOpenAuth, onLogout }) {
  return (
    <nav className="bg-white shadow-md w-64 flex flex-col p-6">
      <div className="h-[30%] flex flex-col justify-between">
        <ul>
          <li className="text-gray-900 p-4 m-6 hover:text-white rounded-3xl text-center hover:bg-sky-700">
            <a href="/" >
              Inicio
            </a>
          </li>
          <li className="text-gray-900 p-4 m-6 hover:text-white rounded-3xl text-center hover:bg-sky-700">
            <a href="/about">
              Telos en oferta
            </a>
          </li>
          <li className="text-gray-900 p-4 m-6 hover:text-white rounded-3xl text-center hover:bg-sky-700">
            <a href="/contact">
              Nosotros
            </a>
          </li>

          <li className=" text-gray-900 p-4 m-6 hover:text-white rounded-3xl text-center hover:bg-sky-700">
            {user ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault() // para que no recargue la página
                  onLogout()
                }}
                
              >
                Cerrar Sesión
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onOpenAuth()
                }}
                
              >
                Iniciar Sesión
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
