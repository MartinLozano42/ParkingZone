import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EmpleadoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("Seguridad");

  useEffect(() => {
    // Datos simulados
    const empleadosFake = [
      { id: 1, nombre: "Juan Pérez", rol: "Seguridad" },
      { id: 2, nombre: "María Gómez", rol: "Técnico" }
    ];
    const emp = empleadosFake.find((e) => e.id === parseInt(id));
    if (emp) {
      setNombre(emp.nombre);
      setRol(emp.rol);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Empleado actualizado: ${nombre} (${rol})`);
    navigate("/admin/empleados");
  };

  return (
    <div className="container py-5">
      <h2>✏️ Editar Empleado</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            className="form-select"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="Seguridad">Seguridad</option>
            <option value="Técnico">Técnico</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Actualizar</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/empleados")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
