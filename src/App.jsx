import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages generales
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservas from "./pages/Reservas";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";

// Pages Admin
import HomeAdmin from "./pages/Admin/HomeAdmin";
import Empleados from "./pages/Admin/Empleados";
import EmpleadoCrear from "./pages/Admin/EmpleadoCrear";
import EmpleadoEditar from "./pages/Admin/EmpleadoEditar";
import Zonas from "./pages/Admin/Zonas";
import ZonaCrear from "./pages/Admin/ZonaCrear";
import ZonaEditar from "./pages/Admin/ZonaEditar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Error leyendo usuario guardado", err);
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar global */}
      <Navbar user={user} setUser={setUser} />

      {/* Contenido dinámico */}
      <main className="flex-grow-1">
        <Routes>
          {/* Público */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservas" element={<Reservas user={user} />} />

          {/* Admin */}
          <Route path="/homeadmin" element={<HomeAdmin user={user} />} />
          <Route path="/admin/empleados" element={<Empleados />} />
          <Route path="/admin/empleados/crear" element={<EmpleadoCrear />} />
          <Route path="/admin/empleados/editar/:id" element={<EmpleadoEditar />} />
          <Route path="/admin/zonas" element={<Zonas />} />
          <Route path="/admin/zonas/crear" element={<ZonaCrear />} />
          <Route path="/admin/zonas/editar/:id" element={<ZonaEditar />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="fw-bold mb-2">🚗 ParkingZone</h5>
              <p className="mb-0 text-light">
                Sistema inteligente de gestión de parqueaderos
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                © {new Date().getFullYear()} ParkingZone –{" "}
                <span className="text-warning">
                  Proyecto Universidad del Valle
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
