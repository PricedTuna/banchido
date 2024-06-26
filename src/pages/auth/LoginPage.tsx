import { useContext, useState } from "react";
import { AuthContext } from "../../common/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { SendLoginDTO } from "../../interfaces/DTOS/auth/login/LoginDTO";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AuthContainer from "./components/AuthContainer";
import LoginInput from "./components/LoginInput";
import useDefaultsSwal from "../../common/hooks/useDefaultsSwal";
import useFormValidator from "../../common/hooks/useFormValidator";
import PwdTextHelper from "./components/PwdTextHelper";
import { Usuario } from "../../interfaces/models/Usuario";
import { Cuenta } from "../../interfaces/models/Cuenta";

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
  const {
    emptyFieldsSwal,
    wrongEmailSwal,
    loginSwal,
    wrongPasswordSwal,
    userNotFoundError,
  } = useDefaultsSwal();
  const { validateEmail, validatePassword } = useFormValidator();

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
        password: false,
      }));
      return false;
    }

    if (!validatePassword(formValues.password)) {
      mySwal.fire(wrongPasswordSwal);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
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

    const UsuarioRecibido: {
      token: string;
      UserData?: Usuario | undefined;
      CuentaData?: Cuenta | undefined;
    } | null = await loginUser(formValues);

    if (UsuarioRecibido && UsuarioRecibido.CuentaData && UsuarioRecibido.UserData && UsuarioRecibido.token) {
      login({CuentaData: UsuarioRecibido.CuentaData, UserData: UsuarioRecibido.UserData}, UsuarioRecibido.token);
      navigate("/home");
      Swal.close(); // Cerrar swals abiertos (loading swal)
    } else {
      Swal.close(); // Cerrar swals abiertos (loading swal)
      mySwal.fire(userNotFoundError);
    }
  };

  const handleOnChange =
    (fieldName: keyof SendLoginDTO) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      if (fieldName === "password") {
        let value = changeEvent.currentTarget.value;
        if (!/^\d*$/.test(value)) {
          changeEvent.target.value = value.replace(/\D/g, "");
        }
      }

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
        <div className="mb-2">
          <LoginInput
            handleOnChange={handleOnChange}
            inputNameValue="password"
            inputTitle="Contraseña"
            inputType="password"
            leftAddonIcon="bi bi-lock"
            isError={formErrors.password}
          />
          <PwdTextHelper />
        </div>

        <button className="btn btn-primary" onClick={() => handleLogin()}>
          Iniciar sesión
        </button>
        <p className="mt-1">
          ¿No tienes una cuenta?{" "}
          <Link
            to="../register"
            className="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-6 loginLinkClass"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
}

export default LoginPage;
