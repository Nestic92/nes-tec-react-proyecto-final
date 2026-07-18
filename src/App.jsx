import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import PanelGestion from "./pages/PanelGestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/productos" element={<Layout><Productos /></Layout>} />
        <Route path="/producto/:id" element={<Layout><ProductoDetalle /></Layout>} />
        <Route path="/carrito" element={<Layout><Carrito /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/registro" element={<Layout><Registro /></Layout>} />
        <Route
          path="/perfil"
          element={
            <Layout>
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/panel"
          element={
            <Layout>
              <ProtectedRoute>
                <PanelGestion />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
