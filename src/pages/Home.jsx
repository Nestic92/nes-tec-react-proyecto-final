import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Componentes de PC de Alto Rendimiento
              </h1>
              <p className="hero-subtitle">
                Encontra los mejores componentes para tu computadora al mejor precio del mercado
              </p>
              <Link to="/productos" className="btn btn-primary btn-lg">
                Explorar Componentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            Nuestros Componentes
          </h2>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar componentes..."
              />
            </div>
            <div className="col-md-6">
              <select className="form-select">
                <option value="">Todas las categorias</option>
                <option value="procesadores">Procesadores</option>
                <option value="tarjetas-graficas">Tarjetas Graficas</option>
                <option value="memorias-ram">Memorias RAM</option>
                <option value="almacenamiento">Almacenamiento</option>
                <option value="placas-madre">Placas Madre</option>
                <option value="fuentes-poder">Fuentes de Poder</option>
                <option value="gabinetes">Gabinetes</option>
                <option value="enfriamiento">Enfriamiento</option>
              </select>
            </div>
          </div>

          <div className="row">
            {/* <ItemListContainer /> */}
          </div>
        </div>
      </section>

      <section className="reviews-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            Resenas de Nuestros Clientes
          </h2>
          <p className="text-center mb-5 text-muted">
            Descubri lo que opinan otros entusiastas de la tecnologia
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="review-card">
                <h6>Juan Perez</h6>
                <p>"Excelente calidad y envio rapido"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            Contactanos
          </h2>

          <form className="contact-form">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nombre"
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
            />
            <textarea
              className="form-control mb-2"
              placeholder="Mensaje"
            />
            <button className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
