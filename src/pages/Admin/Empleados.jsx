import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Empleados() {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Carlos Pérez", rol: "Seguridad" },
    { id: 2, nombre: "Ana Gómez", rol: "Técnico" },
    { id: 3, nombre: "Luis Fernández", rol: "Administrador" },
    { id: 4, nombre: "Marta López", rol: "Seguridad" },
    { id: 5, nombre: "Pedro Sánchez", rol: "Seguridad" },
    { id: 6, nombre: "Laura Ramírez", rol: "Seguridad" },
    { id: 7, nombre: "Javier Torres", rol: "Técnico" },
    { id: 8, nombre: "Paula Medina", rol: "Supervisora" },
    { id: 9, nombre: "Andrés Castillo", rol: "Seguridad" },
    { id: 10, nombre: "Elena Vargas", rol: "Gestion de Reservas" },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar empleado?")) {
      setEmpleados(empleados.filter(e => e.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">👥 Gestión de Empleados</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/empleados/crear")}
      >
        ➕ Crear nuevo empleado
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nombre}</td>
              <td>{emp.rol}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/admin/empleados/editar/${emp.id}`)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(emp.id)}
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
