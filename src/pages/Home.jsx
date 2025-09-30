import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    { icon: "⏰", title: "Reserva Rápida", desc: "Reserva tu espacio en segundos" },
    { icon: "📱", title: "App Móvil", desc: "Control desde tu celular" },
    { icon: "💰", title: "Pagos Seguros", desc: "Sistema de pago integrado" },
    { icon: "🛡️", title: "Seguridad", desc: "Vigilancia 24/7" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="text-white d-flex align-items-center justify-content-center"
        style={{
          height: "70vh",
          background: "linear-gradient(135deg, rgba(164,14,28,0.9) 0%, rgba(51,51,51,0.95) 100%), url('https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
          position: "relative"
        }}
      >
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-4">
            Bienvenido a <span className="text-warning">ParkingZone</span> 🚗
          </h1>
          <p className="lead fs-4 mb-5">
            Tu solución inteligente para estacionamiento. 
            <br />Rápido, seguro y eficiente.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/reservas" className="btn btn-warning btn-lg fw-bold px-5 py-3">
              🅿️ Ver Espacios Disponibles
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-5 py-3">
              🔑 Mi Cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">¿Por qué elegir ParkingZone?</h2>
            <p className="lead text-muted">La mejor experiencia de estacionamiento</p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="display-4 mb-3">{feature.icon}</div>
                    <h5 className="fw-bold text-dark">{feature.title}</h5>
                    <p className="text-muted">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: "#A40E1C" }}>
        <div className="container text-center text-white">
          <h3 className="fw-bold mb-3">¿Listo para comenzar?</h3>
          <p className="fs-5 mb-4">Únete a miles de usuarios que ya usan ParkingZone</p>
          <Link to="/login" className="btn btn-light btn-lg fw-bold px-5">
            🚀 Comenzar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}