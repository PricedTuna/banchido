import { SweetAlertOptions } from "sweetalert2";

function useDefaultsSwal() {
  const loginSwal: SweetAlertOptions = {
    title: "Iniciando sesión...",
  };

  const doingTransferSwal: SweetAlertOptions = {
    title: "Realizando transferencia...",
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
    title: "Formato de contraseña incorrecta",
    text: "La contraseña debe de tener 4 dígitos numéricos",
    icon: "error",
  };

  const emptyFieldsSwal: SweetAlertOptions = {
    title: "Ningún campo puede estar vacío",
    icon: "error",
  };

  const genericErrorSwal: SweetAlertOptions = {
    title: "Sucedió un error, inténtalo más tarde",
    text: "Si el problema persiste, contacte al empleado más cercano",
    icon: "error",
  };

  const passwordExistError: SweetAlertOptions = {
    title: "La contraseña ingresada ya existe",
    text: "Cambie a una contraseña única, por favor",
    icon: "error",
  };

  const emailExistError: SweetAlertOptions = {
    title: "El correo ingresado ya existe",
    text: "Cambie a un correo único, por favor",
    icon: "error",
  };

  const userNotFoundError: SweetAlertOptions = {
    title:
      "Usuario y/o contraseña incorrectos",
    icon: "error",
  }

  const transferSameAccError: SweetAlertOptions = {
    title:
      "No puedes realizar una transferencia a tu propia cuenta",
    icon: "error",
  }

  const noCantidadError: SweetAlertOptions = {
    title:
      "La cantidad no puede ser cero",
    icon: "error",
  }

  return {
    wrongEmailSwal,
    doingTransferSwal,
    emptyFieldsSwal,
    loginSwal,
    registerSwal,
    wrongPasswordSwal,
    genericErrorSwal,
    passwordExistError,
    emailExistError,
    userNotFoundError,
    transferSameAccError,
    noCantidadError
  };
}

export default useDefaultsSwal;
