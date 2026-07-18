import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getProductoPorId } from "../services/productosService";

const ProductoDetalle = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarProducto = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProductoPorId(id);

        if (!data) {
          setError("No se encontro el producto");
          return;
        }

        setProducto(data);
      } catch (loadError) {
        setError(loadError.message || "No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="loading-spinner mx-auto mb-3" />
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error || "Producto no encontrado"}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="content-card product-detail-card">
        <img
          src={producto.imagen || "/favicon.svg"}
          alt={producto.nombre}
          className="detail-image"
        />

        <div>
          <h2>{producto.nombre}</h2>
          <p className="mb-2"><strong>Categoria:</strong> {producto.categoria}</p>
          <p className="mb-4"><strong>Precio:</strong> ${producto.precio}</p>

          <button
            className="btn btn-success"
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
