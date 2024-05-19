import ActionButton from "../components/ActionButton";
import useNotAutorized from "../../common/hooks/useNotAutorized"; 
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PagesContainer from "../components/PagesContainer";
import { AuthContext, useUserAndCountInfo } from "../../common/context/AuthContext";

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
    <PagesContainer>
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
    </PagesContainer>
  );
}

export default HomePage;
