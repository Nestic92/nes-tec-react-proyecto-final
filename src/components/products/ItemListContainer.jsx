import { useEffect, useState } from "react";
import Item from "./item";
import { getProductos } from "../../services/productosService";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoria === "" || p.categoria === categoria)
  );

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorias</option>
            <option value="cpu">CPU</option>
            <option value="gpu">GPU</option>
            <option value="ram">RAM</option>
            <option value="almacenamiento">Almacenamiento</option>
            <option value="gabinete">Gabinete</option>
            <option value="fuente">Fuente</option>
            <option value="mother">Motherboard</option>
            <option value="cooler">Cooler</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="loading-spinner mx-auto mb-3" />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          {productosFiltrados.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
