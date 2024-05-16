import ActionButton from "../components/ActionButton";
import { AuthContext, useUserAndCountInfo } from "../../context/AuthContext";
import useNotAutorized from "../../hooks/useNotAutorized";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const navigate = useNavigate();
  
  const userAndCountInfo = useUserAndCountInfo();
  const sendToLoginLogout = useNotAutorized();

  if (userAndCountInfo == undefined){
    sendToLoginLogout()
  }

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center gap-2"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="mb-0">{ `${userAndCountInfo?.nombres} ${userAndCountInfo?.apellidos}` }</h1>
      <p className="m-0" style={{ fontSize: "6rem" }}>{ userAndCountInfo?.saldo }</p>
      <p className="fs-6 mb-3">Numero cuenta: {userAndCountInfo?.numeroCuenta}</p>
      <div className="d-grid gap-2 col-6-md mx-auto">
        <ActionButton page="actions" title="Acciones" />
        <ActionButton page="historial" title="Historial" />
        <p className="btn btn-primary px-3 py-2" onClick={handleSignOut}>
          Cerrar sesion
        </p>
      </div>
    </div>
  );
}

export default HomePage;
