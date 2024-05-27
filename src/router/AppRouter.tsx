import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./protected/ProtectedRoute"; 
import ActionsPage from "../pages/actions/ActionsPage";
import TransferenciaActPage from "../pages/actions/actionsPages/TransferenciaActPage";
import RSTActPage from "../pages/actions/actionsPages/RSTActPage";
import EditarPerfilActPage from "../pages/actions/actionsPages/EditProfileActPage";
import AddCardActPage from "../pages/actions/actionsPages/AddCardActPage";
import HistorialPage from "../pages/historial/HistorialPage";
import RegisterPage from "../pages/auth/RegisterPage";
import { AuthProvider, initialState } from "../common/context/AuthContext";

const baseURL = ""; // Local

const router = createBrowserRouter([

  {
    path: baseURL,
    element: <LoginPage />,
  },
  {
    path: baseURL+"/login",
    element: <LoginPage />,
  },
  {
    path: baseURL+"/register",
    element: <RegisterPage />,
  },
  {
    path: baseURL+"/",
    element: <ProtectedRoute />,
    children: [
      {
        path: baseURL+"/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "actions",
            element: <ActionsPage />,
          },
          // Actions pages
          {
            path: "transfer",
            element: <TransferenciaActPage />,
          },
          {
            path: "RST",
            element: <RSTActPage />,
          },
          {
            path: "edit-profile",
            element: <EditarPerfilActPage />,
          },
          {
            path: "add-card",
            element: <AddCardActPage />,
          },
          // Historial
          {
            path: "historial",
            element: <HistorialPage />,
          },
        ],
      },
    ],
  },
]);

function AppRouter() {
  return (
    <AuthProvider
      isLoggedIn={initialState.isLoggedIn}
      cuentaData={initialState.cuentaData}
      userData={initialState.userData}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
