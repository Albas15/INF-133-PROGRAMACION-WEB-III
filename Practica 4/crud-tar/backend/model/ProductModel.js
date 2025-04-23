import pool from "../config/db.js";

export const obtenerTodosProductos = async () => {
  const [array] = await pool.query('SELECT * FROM productos');
  return array;
};

export const crearNuevoProducto = async (nombre) => {
  const [resultado] = await pool.query('INSERT INTO productos(nombre) VALUES(?)', [nombre]);
  return resultado.insertId;
};

export const ActualizarProducto = async (id, nombre) => {
  await pool.query('UPDATE productos SET nombre=? WHERE id = ?', [nombre, id]);
};

export const buscarProducto = async (id) => {
  const [array] = await pool.query('SELECT * FROM productos WHERE id=?', [id]);
  return array[0];
};

export const EliminarProducto = async (id) => {
  await pool.query('DELETE FROM productos WHERE id=?', [id]);
};