import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { LoginDTO } from "../../interfaces/DTOS/LoginDTO";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AuthContainer from "./components/AuthContainer";
import LoginInput from "./components/LoginInput";
import { LoginRecibeDTO } from "../../interfaces/DTOS/LoginRecibeDTO";

function LoginPage() {
  const authContext = useContext(AuthContext);
  if (authContext == undefined) return <h1>Tas mal con el context pa</h1>;

  const navigate = useNavigate();
  const { login } = authContext;
  const { loginUser } = useAuth();
  const mySwal = withReactContent(Swal);

  const [formValues, setFormValues] = useState<LoginDTO>({
    correo: "",
    password: "",
  });

  const validateLoginForm = (): boolean => {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(formValues.correo == "" || formValues.password == ""){
      mySwal.fire({
        title: "No pueden haber campos vacíos",
        icon: "error",
      });
      return false;
    }

    if (!emailPattern.test(formValues.correo)) {
      mySwal.fire({
        title: "Verifica la sintaxys de tu correo",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateLoginForm())
      return;
    

    mySwal.fire({
      // Login swal
      title: "Iniciando sesión...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const UsuarioRecibido: LoginRecibeDTO | null = await loginUser(formValues);

    if (UsuarioRecibido) {
      login(UsuarioRecibido);
      navigate("/home");
      Swal.close(); // Cerrar swals abiertos (loading swal)
    } else {
      Swal.close(); // Cerrar swals abiertos (loading swal)
      mySwal.fire({
        title:
          "Tu cuenta no fue encontrada, verifica tus credenciales o intenta registrarte",
        icon: "error",
      });
    }
  };

  const handleOnChange =
    (fieldName: keyof LoginDTO) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <AuthContainer>
      <div className="container d-flex flex-column">
        <div className="mb-3">
          <LoginInput
            handleOnChange={handleOnChange}
            inputNameValue="correo"
            inputTitle="Correo electrónico"
            inputType="email"
            leftAddonIcon="bi bi-envelope"
          />
        </div>
        <div className="mb-3">
          <LoginInput
            handleOnChange={handleOnChange}
            inputNameValue="password"
            inputTitle="Contraseña"
            inputType="password"
            leftAddonIcon="bi bi-lock"
          />
        </div>

        <button className="btn btn-primary" onClick={() => handleLogin()}>
          Iniciar sesion
        </button>
        <p className="mt-1">
          ¿No tienes una cuenta?{" "}
          <Link
            to="../register"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-6"
          >
            registrate aqui
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
}

export default LoginPage;
