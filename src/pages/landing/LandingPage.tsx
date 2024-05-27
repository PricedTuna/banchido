import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: "100vh", maxWidth: "40rem", backgroundColor: "#A1BEDB" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column mb-2">
        <h1>Banchido</h1>
        <p>El banco mas chido de la FIM</p>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column mb-2">
        <p>
          Este banco tiene como propósito ser expuesto como proyecto final en la
          presentación de proyectos de la materia de Sistemas Digitales.
        </p>
        <h4>Integrantes</h4>
        <ul>
          <li>Edgar Eduardo Vega Ruiz</li>
          <li>Yewdiel Antonio Martinez Medina</li>
          <li>Sara Geraldine Arredondo Soto</li>
          <li>Angel Miguel Higuera Almada</li>
        </ul>
      </div>
      <div>
        <h4>Salon: 2-03</h4>
      </div>
      <div>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
