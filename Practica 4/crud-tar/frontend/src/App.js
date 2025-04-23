import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProductoNombre, setNuevoProductoNombre] = useState('');
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [error, setError] = useState('');

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/productos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setError('Error al cargar los productos: ' + error.message);
      console.error('Error fetching productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleCrearProducto = async () => {
    if (!nuevoProductoNombre.trim()) {
      alert('Por favor, ingrese un nombre para el producto.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nuevoProductoNombre }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNuevoProductoNombre('');
      fetchProductos();
    } catch (error) {
      setError('Error al crear el producto: ' + error.message);
      console.error('Error creating producto:', error);
    }
  };

  const handleEliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/productos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchProductos();
      } catch (error) {
        setError('Error al eliminar el producto: ' + error.message);
        console.error('Error deleting producto:', error);
      }
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoAEditar(producto);
    setNombreEditado(producto.nombre);
  };

  const handleGuardarEdicion = async () => {
    if (!nombreEditado.trim()) {
      alert('Por favor, ingrese un nuevo nombre para el producto.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/productos/${productoAEditar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombreEditado }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProductoAEditar(null);
      fetchProductos();
    } catch (error) {
      setError('Error al actualizar el producto: ' + error.message);
      console.error('Error updating producto:', error);
    }
  };

  const handleCancelarEdicion = () => {
    setProductoAEditar(null);
  };

  return (
    <div className="App contendor">
      <h1>Gestión de Productos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="btn-crear">
        <h2>Crear Nuevo Producto</h2>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProductoNombre}
          onChange={(e) => setNuevoProductoNombre(e.target.value)}
        />
        <button onClick={handleCrearProducto}>Crear Producto</button>
      </div>

      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  {productoAEditar?.id === producto.id ? (
                    <input
                      type="text"
                      value={nombreEditado}
                      onChange={(e) => setNombreEditado(e.target.value)}
                    />
                  ) : (
                    producto.nombre
                  )}
                </td>
                <td>
                  {productoAEditar?.id === producto.id ? (
                    <>
                      <button onClick={handleGuardarEdicion}>Guardar</button>
                      <button onClick={handleCancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditarProducto(producto)}>Editar</button>
                      <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;