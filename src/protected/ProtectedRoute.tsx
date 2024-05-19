import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../common/context/AuthContext"; 
import LoginPage from "../pages/auth/LoginPage";
import { AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <Outlet />
    </AnimatePresence>
  )
}

export default ProtectedRoute