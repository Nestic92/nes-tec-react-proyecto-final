import { useEffect, useState } from "react";
import {
  crearProducto,
  editarProducto,
  eliminarProducto,
  getProductos
} from "../services/productosService";

const initialForm = {
  nombre: "",
  precio: "",
  imagen: "",
  categoria: ""
};

const PanelGestion = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const cargarProductos = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getProductos();
      setProductos(data);
    } catch (loadError) {
      setError(loadError.message || "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditandoId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMensaje("");

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    if (Number(formData.precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    if (!formData.categoria) {
      setError("La categoria es obligatoria");
      return;
    }

    setSaving(true);

    try {
      if (editandoId) {
        const productoEditado = await editarProducto(editandoId, formData);

        setProductos(
          productos.map((producto) =>
            producto.id === editandoId ? productoEditado : producto
          )
        );
        setMensaje("Producto editado correctamente");
      } else {
        const nuevoProducto = await crearProducto(formData);
        setProductos([...productos, nuevoProducto]);
        setMensaje("Producto agregado correctamente");
      }

      resetForm();
    } catch (submitError) {
      setError(submitError.message || "No se pudo guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  const handleEditar = (producto) => {
    setFormData({
      nombre: producto.nombre,
      precio: String(producto.precio),
      imagen: producto.imagen,
      categoria: producto.categoria
    });
    setEditandoId(producto.id);
    setMensaje("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) {
      return;
    }

    try {
      await eliminarProducto(productoAEliminar.id);
      setProductos(
        productos.filter((producto) => producto.id !== productoAEliminar.id)
      );
      setMensaje("Producto eliminado correctamente");
    } catch (deleteError) {
      setError(deleteError.message || "No se pudo eliminar el producto");
    } finally {
      setProductoAEliminar(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="content-card mb-4">
        <h2 className="mb-4">Panel de gestion</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              name="precio"
              className="form-control"
              value={formData.precio}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Categoria</label>
            <select
              name="categoria"
              className="form-select"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="cpu">CPU</option>
              <option value="gpu">GPU</option>
              <option value="ram">RAM</option>
              <option value="almacenamiento">Almacenamiento</option>
              <option value="gabinete">Gabinete</option>
              <option value="fuente">Fuente</option>
              <option value="mother">Mother</option>
              <option value="cooler">Cooler</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">URL de imagen</label>
            <input
              type="text"
              name="imagen"
              className="form-control"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="/imagenes/noctua.jpeg"
            />
          </div>

          <div className="col-12 d-flex flex-wrap gap-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving
                ? "Guardando..."
                : editandoId
                  ? "Guardar cambios"
                  : "Agregar producto"}
            </button>

            {editandoId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="content-card">
        <h3 className="mb-3">Productos cargados</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="loading-spinner mx-auto mb-3" />
            <p>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <p>No hay productos cargados.</p>
        ) : (
          <div className="product-admin-list">
            {productos.map((producto) => (
              <div key={producto.id} className="admin-card">
                <img
                  src={producto.imagen || "/favicon.svg"}
                  alt={producto.nombre}
                  className="admin-card-image"
                />

                <div className="admin-card-body">
                  <h5>{producto.nombre}</h5>
                  <p className="mb-1">${producto.precio}</p>
                  <p className="mb-3 text-muted">{producto.categoria}</p>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setProductoAEliminar(producto)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {productoAEliminar && (
        <div className="modal-backdrop-custom">
          <div className="confirm-modal">
            <h4>Confirmar eliminacion</h4>
            <p>
              Estas seguro de eliminar <strong>{productoAEliminar.nombre}</strong>?
            </p>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setProductoAEliminar(null)}
              >
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmarEliminacion}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelGestion;
