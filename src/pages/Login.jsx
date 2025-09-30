import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Mock de login (puedes cambiar a un fetch real después)
      let user = null;

      if (email === "admin@parking.com" && password === "1234") {
        user = { id: 1, name: "Admin", role_id: 1 }; // admin
      } else if (email === "user@parking.com" && password === "1234") {
        user = { id: 2, name: "Usuario", role_id: 2 };
      } else if (email === "seguridad@parking.com" && password === "1234") {
        user = { id: 3, name: "seguridad", role_id: 3 };
      } else {
        alert("Credenciales incorrectas");
        return;
      }

      // 🔹 Guardar en estado y localStorage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔹 Redirigir según rol
      if (user.role_id === 1) {
        navigate("/homeadmin"); // Admin → Dashboard
      } else {
        navigate("/home"); // Usuario normal → Home
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">🔑 Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}
