import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito((currentCart) => {
      const existe = currentCart.find((p) => p.id === producto.id);

      if (existe) {
        return currentCart.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...currentCart, { ...producto, cantidad: 1 }];
    });
  };

  const increase = (id) => {
    setCarrito((currentCart) =>
      currentCart.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const decrease = (id) => {
    setCarrito((currentCart) =>
      currentCart.map((p) =>
        p.id === id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
    );
  };

  const removeItem = (id) => {
    setCarrito((currentCart) => currentCart.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPrice = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        increase,
        decrease,
        removeItem,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
