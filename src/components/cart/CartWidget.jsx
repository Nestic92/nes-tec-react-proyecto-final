import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartWidget = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <span className="text-white">
      Carrito ({totalItems})
    </span>
  );
};

export default CartWidget;
