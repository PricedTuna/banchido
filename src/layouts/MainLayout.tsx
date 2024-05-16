import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function MainLayout() {

  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
      <nav className="navbar navbarBg container-fluid shadow">
        <div className="container d-flex justify-content-center">
          <Link className="navbar-brand fs-1" to="/">
            Banchido
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default MainLayout;
