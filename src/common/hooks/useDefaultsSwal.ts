import { SweetAlertOptions } from "sweetalert2";

function useDefaultsSwal() {
  const loginSwal: SweetAlertOptions = {
    title: "Iniciando sesión...",
  };

  const registerSwal: SweetAlertOptions = {
    title: "Registrando usuario...",
  };

  const wrongEmailSwal: SweetAlertOptions = {
    title: "Formato de correo incorrecto",
    text: "El correo debe de tener un formato correcto, ejemplo: example@gmail.com",
    icon: "error",
  };

  const wrongPasswordSwal: SweetAlertOptions = {
    title: "Formato de contrasena incorrecta",
    text: "La contrasena debe de tener 4 digitos numericos",
    icon: "error",
  };

  const emptyFieldsSwal: SweetAlertOptions = {
    title: "Ningun campo puede estar vacio",
    icon: "error",
  };

  const genericErrorSwal: SweetAlertOptions = {
    title: "Sucedió un error, intentalo mas tarde",
    text: "Si el problema persiste contacte al empleado mas cercano",
    icon: "error",
  };

  const passwordExistError: SweetAlertOptions = {
    title: "La contrasena ingresada ya existe",
    text: "Cambie a una contrasena unica por favor",
    icon: "error",
  };

  const emailExistError: SweetAlertOptions = {
    title: "El email ingresado ya existe",
    text: "Cambie a una email unico por favor",
    icon: "error",
  };

  return {
    wrongEmailSwal,
    emptyFieldsSwal,
    loginSwal,
    registerSwal,
    wrongPasswordSwal,
    genericErrorSwal,
    passwordExistError,
    emailExistError
  };
}

export default useDefaultsSwal;
