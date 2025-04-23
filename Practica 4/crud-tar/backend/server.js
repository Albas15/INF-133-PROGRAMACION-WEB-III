import express from 'express';
import rutas from './routes/routes.js';
import cors from 'cors';
import pool from './config/db.js'; //Esto es para que importe el Pool

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api', rutas);

// Verificacion a la base  de datos
pool.getConnection()
  .then(connection => {
    console.log("Conexión exitosa a la base de datos");
    connection.release();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto: ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error de conexión a la base de datos:", err);
  });