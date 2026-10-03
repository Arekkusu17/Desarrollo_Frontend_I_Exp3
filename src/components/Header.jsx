function Header({ cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top" aria-label="Navegacion principal">
      <div className="container">
        <a className="navbar-brand text-dark" href="#inicio">TechNova Store</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menu de navegacion"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="#categorias">Categorias</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            <li className="nav-item ms-lg-3">
              <a className="btn btn-sm btn-outline-brand position-relative" href="#carrito">
                Carrito
                <span className="cart-badge" aria-label={`${cartCount} productos en el carrito`}>
                  {cartCount}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
