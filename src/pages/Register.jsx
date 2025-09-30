import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
fetch("/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre, email, password })
});



      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error(data.message || "Error en el registro");
      }

    } catch (err) {
      setError(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // Datos de prueba
  const fillTestData = () => {
    setForm({
      nombre: "Juan",
      email: `test${Date.now()}@test.com`,
      password: "1234"
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">📝 Registro</h4>
            </div>
            
            <div className="card-body">
              <button 
                onClick={fillTestData}
                type="button"
                className="btn btn-outline-primary btn-sm mb-3"
              >
                🧪 Rellenar datos de prueba
              </button>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Contraseña *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "⏳ Registrando..." : "🚀 Registrarse"}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
