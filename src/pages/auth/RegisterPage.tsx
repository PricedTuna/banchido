import { useContext, useRef, useState } from "react";
import { RegisterDTO } from "../../interfaces/DTOS/auth/RegisterDTO";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "./components/RegisterInput";
import AuthContainer from "./components/AuthContainer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "../../common/context/AuthContext";
import { AnimatePresence } from "framer-motion";
import RegisterInputWrap from "../../common/components/AnimatedInputWrap";
import { motion } from "framer-motion";
import useDefaultsSwal from "../../common/hooks/useDefaultsSwal";
import useFormValidator from "../../common/hooks/useFormValidator";
import PwdTextHelper from "./components/PwdTextHelper";

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
  const {
    emptyFieldsSwal,
    wrongEmailSwal,
    registerSwal,
    wrongPasswordSwal,
    genericErrorSwal,
  } = useDefaultsSwal();
  const { validateEmail, validatePassword } = useFormValidator();

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
    isEmpty.current = false; // set false before check it
    // Valida si hay un campo vacío
    for (let key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        if (formValues[key as keyof RegisterDTO].length <= 0) {
          // ~ esta vacío
          mySwal.fire(emptyFieldsSwal);
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
    }

    // Valida email
    if (!validateEmail(formValues.Correo)) {
      mySwal.fire(wrongEmailSwal);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        correo: true, // Marca el campo como con error
        password: false,
      }));
      return false;
    }

    // Valida password
    if (!validatePassword(formValues.Password)) {
      mySwal.fire(wrongPasswordSwal);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!verifyRegisterForm()) return;

    mySwal.fire({
      ...registerSwal,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const UsuarioRecibido = await registerUser(formValues);

    if (UsuarioRecibido && UsuarioRecibido.CuentaData && UsuarioRecibido.UserData && UsuarioRecibido.token) {
      login({CuentaData: UsuarioRecibido.CuentaData, UserData: UsuarioRecibido.UserData}, UsuarioRecibido.token);
      navigate("/home");
      Swal.close(); // Cerrar swals abiertos (loading swal)
    } else {
      Swal.close(); // Cerrar swals abiertos (loading swal)
      console.error("No usuario recibido"); // !
      mySwal.fire(genericErrorSwal);
    }
  };

  const handleOnChange =
    (fieldName: keyof RegisterDTO) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      
      if(fieldName === "Password"){
        let value = changeEvent.currentTarget.value;
        if (!/^\d*$/.test(value)) {
          changeEvent.target.value = value.replace(/\D/g, '');
        }
      }

      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <AuthContainer>
      <AnimatePresence>
        <div className="container d-flex flex-column">
          {isVisible && (
            <>
              <RegisterInputWrap>
                <RegisterInput
                  inputNameValue="Nombres"
                  inputTitle="Nombres"
                  handleOnChange={handleOnChange}
                  inputType="input"
                  leftAddonIcon="bi bi-person-fill"
                  isError={formErrors.Nombres}
                  value={formValues.Nombres}
                />
              </RegisterInputWrap>

              <RegisterInputWrap>
                <RegisterInput
                  inputNameValue="Apellido1"
                  inputTitle="Apellido paterno"
                  handleOnChange={handleOnChange}
                  inputType="input"
                  leftAddonIcon="bi bi-person-fill"
                  isError={formErrors.Apellido1}
                  value={formValues.Apellido1}
                />
              </RegisterInputWrap>

              <RegisterInputWrap>
                <RegisterInput
                  inputNameValue="Apellido2"
                  inputTitle="Apellido materno"
                  handleOnChange={handleOnChange}
                  inputType="input"
                  leftAddonIcon="bi bi-person-fill"
                  isError={formErrors.Apellido2}
                  value={formValues.Apellido2}
                />
              </RegisterInputWrap>
            </>
          )}
          {!isVisible && (
            <>
              <RegisterInputWrap>
                <RegisterInput
                  inputNameValue="Correo"
                  inputTitle="Correo electronico"
                  handleOnChange={handleOnChange}
                  inputType="email"
                  leftAddonIcon="bi bi-envelope"
                  isError={formErrors.Correo}
                  value={formValues.Correo}
                />
              </RegisterInputWrap>

              <RegisterInputWrap>
                <RegisterInput
                  inputNameValue="Password"
                  inputTitle="Contraseña"
                  handleOnChange={handleOnChange}
                  inputType="password"
                  leftAddonIcon="bi bi-lock"
                  isError={formErrors.Password}
                  value={formValues.Password}
                />
                <PwdTextHelper />
              </RegisterInputWrap>

              {/* <RegisterInputWrap>
                <RegisterInput
                  handleOnChange={handleOnChange}
                  inputNameValue="FechaNacimiento"
                  inputTitle="Fecha de nacimiento"
                  inputType="date"
                  leftAddonIcon="bi bi-calendar"
                  isError={formErrors.FechaNacimiento}
                  value={formValues.FechaNacimiento}
                />
              </RegisterInputWrap> */}
            </>
          )}

          <button
            className="btn btn-primary mt-3 mb-1"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "Atras" : "Siguiente"}
          </button>

          {isVisible && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="btn btn-primary"
              hidden={!isVisible}
              onClick={() => handleRegister()}
            >
              Registrarme
            </motion.button>
          )}
          <p className="mt-1">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="../login"
              className="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-6 loginLinkClass"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </AnimatePresence>
    </AuthContainer>
  );
}

export default RegisterPage;
