
import { Link, Outlet, } from "react-router-dom";

function MainLayout() {

  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
      <nav className="navbar navbarBg container-fluid shadow">
        <div className="container d-flex justify-content-center">
          <Link className="navbar-brand fs-1" to="/home">
            {/* <img src="src/assets/BanchidoLogo.jpeg" alt="" style={{rotate: "-90deg"}} width={100} /> */}
            Banchido
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default MainLayout;
