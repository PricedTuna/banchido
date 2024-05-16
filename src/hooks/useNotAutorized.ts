import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

function useNotAutorized() {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  const sendToLoginLogout = () => {
    logout();
    navigate("/login")
  }

  return sendToLoginLogout;
}

export default useNotAutorized
