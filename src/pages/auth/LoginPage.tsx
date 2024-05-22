import { useContext, useState } from "react";
import { AuthContext } from "../../common/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { SendLoginDTO } from "../../interfaces/DTOS/auth/login/LoginDTO";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AuthContainer from "./components/AuthContainer";
import LoginInput from "./components/LoginInput";
import { LoginRecibeDTO } from "../../interfaces/DTOS/auth/LoginRecibeDTO";
import useDefaultsSwal from "../../common/hooks/useDefaultsSwal";
import useFormValidator from "../../common/hooks/useFormValidator";

export interface LoginErrors {
  correo: boolean;
  password: boolean;
}

function LoginPage() {
  const authContext = useContext(AuthContext);
  if (authContext == undefined) return <h1>Tas mal con el context pa</h1>;

  const navigate = useNavigate();
  const { login } = authContext;
  const { loginUser } = useAuth();
  const mySwal = withReactContent(Swal);
  const {emptyFieldsSwal, wrongEmailSwal, loginSwal, wrongPasswordSwal} = useDefaultsSwal();
  const {validateEmail, validatePassword} = useFormValidator();

  const [formValues, setFormValues] = useState<SendLoginDTO>({
    correo: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<LoginErrors>({
    correo: false,
    password: false,
  });

  const validateLoginForm = (): boolean => {
    

    if (formValues.correo == "" || formValues.password == "") {
      mySwal.fire(emptyFieldsSwal);

      if (formValues.correo == "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          correo: true, // Marca el campo como con error
        }));
      }

      if (formValues.password == "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: true, // Marca el campo como con error
        }));
      }

      return false;
    }

    if (!validateEmail(formValues.correo)) {
      mySwal.fire(wrongEmailSwal);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        correo: true, // Marca el campo como con error
        password: false
      }));
      return false;
    }

    if (!validatePassword(formValues.password)) {
      mySwal.fire(wrongPasswordSwal);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: true
      }));
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateLoginForm()) return;
    else setFormErrors({ ...formErrors, correo: false, password: false });

    mySwal.fire({
      ...loginSwal,
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
    (fieldName: keyof SendLoginDTO) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <AuthContainer>
      <div className="container d-flex flex-column">
        <div className="mb-1">
          <LoginInput
            handleOnChange={handleOnChange}
            inputNameValue="correo"
            inputTitle="Correo electrónico"
            inputType="email"
            leftAddonIcon="bi bi-envelope"
            isError={formErrors.correo}
          />
        </div>
        <div className="mb-1">
          <LoginInput
            handleOnChange={handleOnChange}
            inputNameValue="password"
            inputTitle="Contraseña"
            inputType="password"
            leftAddonIcon="bi bi-lock"
            isError={formErrors.password}
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
