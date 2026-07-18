import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CartWidget from "../cart/CartWidget";
import CartSidebar from "../cart/CartSidebar";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">NesTec</Link>

          <div className="d-flex flex-wrap align-items-center gap-3 nav-links-custom">
            <Link to="/" className="nav-link text-white">Inicio</Link>
            <Link to="/productos" className="nav-link text-white">Productos</Link>
            <Link to="/carrito" className="nav-link text-white">Carrito</Link>

            {isAuthenticated ? (
              <>
                <Link to="/perfil" className="nav-link text-white">Perfil</Link>
                <Link to="/panel" className="nav-link text-white">Panel</Link>
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-white">Login</Link>
                <Link to="/registro" className="nav-link text-white">Registro</Link>
              </>
            )}

            <button className="btn btn-sm btn-outline-light" onClick={() => setOpen(true)}>
              <CartWidget />
            </button>
          </div>
        </div>
      </nav>

      <CartSidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
