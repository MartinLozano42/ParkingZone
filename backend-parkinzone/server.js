import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "univalle",
  database: process.env.DB_NAME || "parquinzone"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error MySQL:", err.message);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// 🔹 Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando OK" });
});

/* ===========================
   🔐 LOGIN
=========================== */
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login attempt:", { email, password });

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND hash_password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Error en query login:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res.json({
        success: true,
        user: {
          id: results[0].id,
          nombre: results[0].nombre,
          email: results[0].email,
          role_id: results[0].role_id
        }
      });
    } else {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
  });
});

/* ===========================
   📝 REGISTER
=========================== */
app.post("/api/register", (req, res) => {
  try {
    console.log("📩 Datos recibidos en /api/register:", req.body);

    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ success: false, message: "Datos incompletos" });
    }

    const fullName = `${nombre} ${apellido || ""}`.trim();
    const roleId = 2; // usuario normal

    const sql = `
      INSERT INTO usuarios (role_id, nombre, email, hash_password, is_active) 
      VALUES (?, ?, ?, ?, 1)
    `;

    db.query(sql, [roleId, fullName, email, password], (err, result) => {
      if (err) {
        console.error("❌ Error insert:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ success: false, message: "Email ya registrado" });
        }
        return res.status(500).json({ success: false, message: "Error al registrar" });
      }

      res.json({
        success: true,
        message: "Usuario registrado exitosamente",
        userId: result.insertId,
      });
    });
  } catch (err) {
    console.error("❌ Error en /api/register:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

/* ===========================
   🅿️ CRUD ZONAS
=========================== */

// Obtener todas las zonas
app.get("/api/zonas", (req, res) => {
  db.query("SELECT * FROM zonas", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Error DB" });
    res.json({ success: true, data: results });
  });
});

// Obtener una zona por ID
app.get("/api/zonas/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM zonas WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Error DB" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Zona no encontrada" });
    res.json({ success: true, data: results[0] });
  });
});

// Crear zona
app.post("/api/zonas", (req, res) => {
  const { zona, capacidad, tarifa } = req.body;
  if (!zona || !capacidad || !tarifa) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }
  db.query(
    "INSERT INTO zonas (zona, capacidad, tarifa) VALUES (?, ?, ?)",
    [zona, capacidad, tarifa],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "Error DB" });
      res.json({ success: true, id: result.insertId, zona, capacidad, tarifa });
    }
  );
});

// Editar zona
app.put("/api/zonas/:id", (req, res) => {
  const { id } = req.params;
  const { zona, capacidad, tarifa } = req.body;
  db.query(
    "UPDATE zonas SET zona=?, capacidad=?, tarifa=? WHERE id=?",
    [zona, capacidad, tarifa, id],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "Error DB" });
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Zona no encontrada" });
      res.json({ success: true, message: "Zona actualizada" });
    }
  );
});

// Eliminar zona
app.delete("/api/zonas/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM zonas WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Error DB" });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Zona no encontrada" });
    res.json({ success: true, message: "Zona eliminada" });
  });
});

/* ===========================
   🚀 Iniciar servidor
=========================== */
app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
});
