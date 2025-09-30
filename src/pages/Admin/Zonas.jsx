import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Zonas() {
  const [zonas, setZonas] = useState([]);

  // 🔹 Cargar zonas del backend
  useEffect(() => {
    fetch("http://localhost:5000/api/zonas")
      .then(res => res.json())
      .then(data => setZonas(data))
      .catch(err => console.error("Error cargando zonas:", err));
  }, []);

  // 🔹 Eliminar zona
  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar zona?")) {
      fetch(`http://localhost:5000/api/zonas/${id}`, {
        method: "DELETE"
      })
        .then(() => setZonas(zonas.filter(z => z.id !== id)))
        .catch(err => console.error("Error eliminando:", err));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">🅿️ Gestión de Zonas de Parqueo</h2>

      <Link to="/admin/ZonaCrear" className="btn btn-success mb-3">
        ➕ Crear nueva zona
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Zona</th>
            <th>Capacidad</th>
            <th>Tarifa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {zonas.map(zona => (
            <tr key={zona.id}>
              <td>{zona.id}</td>
              <td>{zona.nombre}</td>
              <td>{zona.capacidad}</td>
              <td>{zona.tarifa}</td>
              <td>
                <Link 
                  to={`/admin/ZonaEditar/${zona.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  ✏️ Editar
                </Link>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(zona.id)}
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
