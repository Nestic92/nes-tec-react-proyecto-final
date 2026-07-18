import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="content-card">
        <h2 className="mb-4">Mi perfil</h2>

        <p>
          <strong>Nombre:</strong> {user?.nombre}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </div>
    </div>
  );
};

export default Perfil;
