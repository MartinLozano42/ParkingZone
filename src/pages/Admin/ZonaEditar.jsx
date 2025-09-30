import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ZonaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [zona, setZona] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [tarifa, setTarifa] = useState("");

  // 🔹 Cargar datos de la zona al entrar
  useEffect(() => {
    const fetchZona = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/zonas/${id}`);
        const data = await res.json();

        if (data.success) {
          setZona(data.data.zona);
          setCapacidad(data.data.capacidad);
          setTarifa(data.data.tarifa);
        } else {
          alert("❌ Zona no encontrada");
          navigate("/admin/zonas");
        }
      } catch (err) {
        console.error("❌ Error cargando zona:", err);
      }
    };

    fetchZona();
  }, [id, navigate]);

  // 🔹 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const zonaEditada = { zona, capacidad, tarifa };

    try {
      const res = await fetch(`http://localhost:5000/api/zonas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zonaEditada),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Zona actualizada correctamente");
        navigate("/admin/zonas");
      } else {
        alert("❌ Error al actualizar zona: " + data.message);
      }
    } catch (err) {
      console.error("❌ Error editando zona:", err);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">✏️ Editar Zona</h2>
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
        <button type="submit" className="btn btn-primary">💾 Guardar cambios</button>
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
