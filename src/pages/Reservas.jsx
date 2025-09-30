import { useState, useEffect } from "react";

export default function Reservas({ user }) {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEspacios([
        { id: 1, codigo: "A-01", tipo: "AUTO", estado: "DISPONIBLE", zona: "A" },
        { id: 2, codigo: "A-02", tipo: "AUTO", estado: "OCUPADO", zona: "A" },
        { id: 3, codigo: "M-01", tipo: "MOTO", estado: "DISPONIBLE", zona: "B" },
        { id: 4, codigo: "VIP-01", tipo: "SUV", estado: "DISPONIBLE", zona: "VIP" }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h4>🔒 Acceso Requerido</h4>
          <p>Debes iniciar sesión para ver las reservas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold text-dark">🅿️ Espacios Disponibles</h1>
              <p className="text-muted">Hola {user.nombre}, aquí puedes ver y gestionar tus reservas</p>
            </div>
            <span className="badge bg-primary fs-6">{user.role_name}</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}></div>
              <p className="mt-3">Cargando espacios disponibles...</p>
            </div>
          ) : (
            <div className="row g-4">
              {espacios.map((espacio) => (
                <div key={espacio.id} className="col-md-6 col-lg-3">
                  <div className={`card h-100 border-0 shadow-sm ${
                    espacio.estado === 'DISPONIBLE' ? 'border-success' : 'border-danger'
                  }`}>
                    <div className="card-body text-center p-4">
                      <div className={`display-4 mb-3 ${
                        espacio.estado === 'DISPONIBLE' ? 'text-success' : 'text-danger'
                      }`}>
                        {espacio.tipo === 'AUTO' ? '🚗' : 
                         espacio.tipo === 'MOTO' ? '🏍️' : '🚙'}
                      </div>
                      <h5 className="fw-bold">{espacio.codigo}</h5>
                      <p className="text-muted">Zona {espacio.zona}</p>
                      <span className={`badge ${
                        espacio.estado === 'DISPONIBLE' ? 'bg-success' : 'bg-danger'
                      }`}>
                        {espacio.estado}
                      </span>
                    </div>
                    <div className="card-footer border-0 bg-transparent">
                      <button 
                        className="btn btn-primary w-100"
                        disabled={espacio.estado !== 'DISPONIBLE'}
                      >
                        {espacio.estado === 'DISPONIBLE' ? 'Reservar' : 'No Disponible'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}