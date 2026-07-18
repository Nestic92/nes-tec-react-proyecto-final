import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";

const Carrito = () => {
  const { carrito, increase, decrease, removeItem, clearCart, totalPrice } = useContext(CartContext);
  const [cupon, setCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const descuento = useMemo(() => {
    if (cuponAplicado === "NES10") {
      return totalPrice * 0.1;
    }

    if (cuponAplicado === "NES20") {
      return totalPrice * 0.2;
    }

    return 0;
  }, [cuponAplicado, totalPrice]);

  const totalFinal = totalPrice - descuento;

  const aplicarCupon = () => {
    const codigo = cupon.trim().toUpperCase();

    if (codigo === "NES10" || codigo === "NES20") {
      setCuponAplicado(codigo);
      setMensaje(`Cupon ${codigo} aplicado correctamente`);
      return;
    }

    setCuponAplicado(null);
    setMensaje("Cupon invalido");
  };

  return (
    <div className="container mt-5">
      <div className="content-card">
        <h2 className="mb-4">Carrito</h2>

        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        {carrito.length === 0 ? (
          <p>Tu carrito esta vacio</p>
        ) : (
          <>
            <div className="cart-page-list">
              {carrito.map((p) => (
                <div key={p.id} className="cart-page-item">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={p.imagen || "/favicon.svg"}
                      alt={p.nombre}
                      className="cart-item-image"
                    />

                    <div>
                      <h5 className="mb-1">{p.nombre}</h5>
                      <p className="mb-0">${p.precio}</p>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <button className="quantity-btn" onClick={() => decrease(p.id)}>
                      -
                    </button>
                    <span>{p.cantidad}</span>
                    <button className="quantity-btn" onClick={() => increase(p.id)}>
                      +
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(p.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="coupon-box mt-4">
              <h4>Cupon de descuento</h4>
              <div className="d-flex flex-wrap gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={cupon}
                  onChange={(event) => setCupon(event.target.value)}
                  placeholder="Proba con NES10 o NES20"
                />
                <button className="btn btn-primary" onClick={aplicarCupon}>
                  Aplicar
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p><strong>Subtotal:</strong> ${totalPrice}</p>
              <p><strong>Descuento:</strong> ${descuento}</p>
              <p><strong>Total final:</strong> ${totalFinal}</p>

              <button className="btn btn-danger" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;
