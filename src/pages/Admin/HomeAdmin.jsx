export default function HomeAdmin({ user }) {
  return (
    <div className="container py-5">
      <h2 className="mb-4">📊 Dashboard Administrativo</h2>

      <div className="alert alert-info">
        Bienvenido <strong>{user?.nombre}</strong>, este es tu panel de control.
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">🚗 Zonas</h5>
              <p className="card-text">Gestión de zonas de parqueo</p>
              <a href="/admin/zonas" className="btn btn-primary">
                Administrar
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">👥 Empleados</h5>
              <p className="card-text">Control de personal</p>
              <a href="/admin/empleados" className="btn btn-primary">
                Administrar
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">📅 Reservas</h5>
              <p className="card-text">Ver y gestionar reservas</p>
              <a href="/reservas" className="btn btn-primary">
                Ver Reservas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
