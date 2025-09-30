import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmpleadoCrear() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("Seguridad");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Empleado creado: ${nombre} (${rol})`);
    navigate("/admin/empleados");
  };

  return (
    <div className="container py-5">
      <h2>➕ Crear Empleado</h2>
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

        <button type="submit" className="btn btn-success">Guardar</button>
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
