import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/login/LoginPage";

function ProtectedRoute() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (authContext == undefined)
    return <LoginPage />

  const {state} = authContext;

  useEffect(() => {
    
    if(!state.isLoggedIn){
      navigate("/login")
    }

  }, [])


  return (
    <Outlet />
  )
}

export default ProtectedRoute