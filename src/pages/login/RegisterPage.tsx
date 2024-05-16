import { useContext, useState } from "react";
import { RegisterDTO } from "../../interfaces/DTOS/RegisterDTO";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "./components/RegisterInput";
import AuthContainer from "./components/AuthContainer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

function RegisterPage() {
  const authContext = useContext(AuthContext);
  if (authContext == undefined) return <h1>Tas mal con el context pa</h1>;

  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);
  const { registerUser } = useAuth();
  const { login } = authContext;

  const verifyRegisterForm = (): boolean => {

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Valida si hay un campo vacío
    for (let key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        if (formValues[key as keyof RegisterDTO].length <= 0) {
          mySwal.fire({
            title: "No puede haber un campo vacío",
            icon: "error",
          });
          return false;
        }
      }
    }

    if (!emailPattern.test(formValues.Correo)) {
      mySwal.fire({
        title: "Verifica la sintaxys de tu correo",
        icon: "error",
      });
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

  const [formValues, setFormValues] = useState<RegisterDTO>({
    Correo: "",
    Password: "",
    Apellido1: "",
    Apellido2: "",
    Nombres: "",
    FechaNacimiento: "",
  });

  const handleOnChange =
    (fieldName: keyof RegisterDTO) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <AuthContainer>
      <div className="container d-flex flex-column">
        <div className="mb-3">
          <RegisterInput
            inputNameValue="Nombres"
            inputTitle="Nombres"
            handleOnChange={handleOnChange}
            inputType="input"
            leftAddonIcon="bi bi-person-fill"
          />
        </div>

        <div className="mb-3">
          <RegisterInput
            inputNameValue="Apellido1"
            inputTitle="Apellido paterno"
            handleOnChange={handleOnChange}
            inputType="input"
            leftAddonIcon="bi bi-person-fill"
          />
        </div>

        <div className="mb-3">
          <RegisterInput
            inputNameValue="Apellido2"
            inputTitle="Apellido materno"
            handleOnChange={handleOnChange}
            inputType="input"
            leftAddonIcon="bi bi-person-fill"
          />
        </div>

        <div className="mb-3">
          <RegisterInput
            inputNameValue="Correo"
            inputTitle="Correo electronico"
            handleOnChange={handleOnChange}
            inputType="email"
            leftAddonIcon="bi bi-envelope"
          />
        </div>

        <div className="mb-3">
          <RegisterInput
            inputNameValue="Password"
            inputTitle="Contraseña"
            handleOnChange={handleOnChange}
            inputType="password"
            leftAddonIcon="bi bi-lock"
          />
        </div>

        <div className="mb-3">
          <RegisterInput
            handleOnChange={handleOnChange}
            inputNameValue="FechaNacimiento"
            inputTitle="Fecha de nacimiento"
            inputType="date"
            leftAddonIcon="bi bi-calendar"
          />
        </div>

        <button className="btn btn-primary" onClick={() => handleRegister()}>
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
    </AuthContainer>
  );
}

export default RegisterPage;
