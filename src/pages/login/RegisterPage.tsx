import { useContext, useRef, useState } from "react";
import { RegisterDTO } from "../../interfaces/DTOS/RegisterDTO";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "./components/RegisterInput";
import AuthContainer from "./components/AuthContainer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import { MagicMotion } from "react-magic-motion";

export interface RegisterErrors {
  Correo: boolean;
  Password: boolean;
  Apellido1: boolean;
  Apellido2: boolean;
  Nombres: boolean;
  FechaNacimiento: boolean;
}

function RegisterPage() {
  const authContext = useContext(AuthContext);
  if (authContext == undefined) return <h1>Tas mal con el context pa</h1>;

  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);
  const { registerUser } = useAuth();
  const { login } = authContext;
  const isEmpty = useRef(false);

  const [formValues, setFormValues] = useState<RegisterDTO>({
    Correo: "",
    Password: "",
    Apellido1: "",
    Apellido2: "",
    Nombres: "",
    FechaNacimiento: "",
  });

  const [formErrors, setFormErrors] = useState<RegisterErrors>({
    Correo: false,
    Password: false,
    Apellido1: false,
    Apellido2: false,
    Nombres: false,
    FechaNacimiento: false,
  });

  const [isVisible, setIsVisible] = useState(false);

  const verifyRegisterForm = (): boolean => {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Valida si hay un campo vacío
    for (let key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        if (formValues[key as keyof RegisterDTO].length <= 0) {
          // ~ esta vacío
          mySwal.fire({
            title: "No puede haber ningún campo vacío",
            icon: "error",
          });
          isEmpty.current = true;
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [key]: true, // Marca el campo como con error
          }));
        } else {
          // ~ tiene contenido
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [key]: false, // Marca el campo como con error
          }));
        }
      }
    }
    if (isEmpty.current) {
      return false;
    } else {
    }

    if (!emailPattern.test(formValues.Correo)) {
      mySwal.fire({
        title: "Verifica la sintaxys de tu correo",
        icon: "error",
      });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        Correo: true, // Marca el campo de correo como con error
      }));
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!verifyRegisterForm()) return;

    mySwal.fire({
      title: "Registrando usuario...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const UsuarioRecibido = await registerUser(formValues);

    if (UsuarioRecibido) {
      login(UsuarioRecibido);
      navigate("/home");
      Swal.close(); // Cerrar swals abiertos (loading swal)
    } else {
      Swal.close(); // Cerrar swals abiertos (loading swal)
      console.error("Verifica tus chingaderas"); // !
      mySwal.fire({
        title: "Sucedió un error, intentalo mas tarde",
        icon: "error",
      });
    }
  };

  const handleOnChange =
    (fieldName: keyof RegisterDTO) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <AuthContainer>
      <MagicMotion>
        <div className="container d-flex flex-column">
          <div>
            <RegisterInput
              inputNameValue="Nombres"
              inputTitle="Nombres"
              handleOnChange={handleOnChange}
              inputType="input"
              leftAddonIcon="bi bi-person-fill"
              isError={formErrors.Nombres}
              isHidden={!isVisible}
            />
          </div>

          <div>
            <RegisterInput
              inputNameValue="Apellido1"
              inputTitle="Apellido paterno"
              handleOnChange={handleOnChange}
              inputType="input"
              leftAddonIcon="bi bi-person-fill"
              isError={formErrors.Apellido1}
              isHidden={!isVisible}
            />
          </div>

          <div>
            <RegisterInput
              inputNameValue="Apellido2"
              inputTitle="Apellido materno"
              handleOnChange={handleOnChange}
              inputType="input"
              leftAddonIcon="bi bi-person-fill"
              isError={formErrors.Apellido2}
              isHidden={!isVisible}
            />
          </div>

          <div>
            <RegisterInput
              inputNameValue="Correo"
              inputTitle="Correo electronico"
              handleOnChange={handleOnChange}
              inputType="email"
              leftAddonIcon="bi bi-envelope"
              isError={formErrors.Correo}
              isHidden={isVisible}
            />
          </div>

          <div>
            <RegisterInput
              inputNameValue="Password"
              inputTitle="Contraseña"
              handleOnChange={handleOnChange}
              inputType="password"
              leftAddonIcon="bi bi-lock"
              isError={formErrors.Password}
              isHidden={isVisible}
            />
          </div>

          <div>
            <RegisterInput
              handleOnChange={handleOnChange}
              inputNameValue="FechaNacimiento"
              inputTitle="Fecha de nacimiento"
              inputType="date"
              leftAddonIcon="bi bi-calendar"
              isError={formErrors.FechaNacimiento}
              isHidden={isVisible}
            />
          </div>

          <button
            className="btn btn-primary mt-3 mb-1"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "Atras" : "Siguiente"}
          </button>
          <button
            className="btn btn-primary"
            hidden={!isVisible}
            onClick={() => handleRegister()}
          >
            Registrarme
          </button>
          <p className="mt-1">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="../login"
              className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-6"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
        </MagicMotion>
    </AuthContainer>
  );
}

export default RegisterPage;
