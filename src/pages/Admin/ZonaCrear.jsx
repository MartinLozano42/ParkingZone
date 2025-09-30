import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ZonaCrear() {
  const [zona, setZona] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [tarifa, setTarifa] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaZona = { zona, capacidad, tarifa };

    try {
      const res = await fetch("http://localhost:5000/api/zonas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaZona),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Zona creada correctamente");
        navigate("/admin/zonas");
      } else {
        alert("❌ Error al crear zona: " + data.message);
      }
    } catch (err) {
      console.error("❌ Error creando zona:", err);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">➕ Crear Nueva Zona</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Nombre de la Zona</label>
          <input
            type="text"
            className="form-control"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capacidad</label>
          <input
            type="number"
            className="form-control"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tarifa</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">✅ Crear</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/zonas")}
        >
          🔙 Cancelar
        </button>
      </form>
    </div>
  );
}
