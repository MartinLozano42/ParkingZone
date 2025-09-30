import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirige a inicio
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🚗 ParkingZone
        </Link>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservas">
                Reservas
              </Link>
            </li>

            {/* Solo admin */}
            {user?.role_id === 1 && (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle ms-2"
                  data-bs-toggle="dropdown"
                >
                  ⚙️ Administración
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/empleados">
                      👥 Empleados
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/zonas">
                      🅿️ Zonas
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          {/* User / Login */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3">👤 {user.nombre}</span>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  🔓 Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-warning">
                🔑 Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
