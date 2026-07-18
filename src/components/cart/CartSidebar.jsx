import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const CartSidebar = ({ open, setOpen }) => {
  const { carrito, increase, decrease, removeItem, clearCart, totalPrice } = useContext(CartContext);

  return (
    <>
      <div
        className={`cart-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
      />

      <div className={`cart-sidebar ${open ? "active" : ""}`}>
        <div className="cart-header">
          <h4>Carrito</h4>
          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <div className="cart-body">
          {carrito.length === 0 ? (
            <p className="empty-cart-message">Carrito vacío</p>
          ) : (
            carrito.map((p) => (
              <div key={p.id} className="cart-item">
                <img
                  src={p.imagen || "/favicon.svg"}
                  alt={p.nombre}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <p className="cart-item-title">{p.nombre}</p>
                  <p className="cart-item-price">${p.precio}</p>

                  <div className="cart-item-controls">
                    <button onClick={() => decrease(p.id)} className="quantity-btn">-</button>
                    <span className="cart-item-quantity">{p.cantidad}</span>
                    <button onClick={() => increase(p.id)} className="quantity-btn">+</button>
                  </div>
                </div>

                <button
                  className="remove-item"
                  onClick={() => removeItem(p.id)}
                >
                  x
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <p className="cart-total">Total: ${totalPrice}</p>

          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-danger btn-sm" onClick={clearCart}>
              Vaciar carrito
            </button>
            <Link to="/carrito" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
              Ir al carrito
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
