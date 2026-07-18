import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Item = ({ producto }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-md-4 mb-4">
      <div className="product-card">

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="product-image"
        />

        <div className="product-card-body">
          <h5 className="product-title">{producto.nombre}</h5>

          <p className="product-price">
            ${producto.precio}
          </p>

          <div className="d-flex gap-2">
            <Link
              to={`/producto/${producto.id}`}
              className="btn btn-primary w-50"
            >
              Ver
            </Link>

            <button
              className="btn btn-success w-50"
              onClick={() => addToCart(producto)}
            >
              🛒
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Item;
