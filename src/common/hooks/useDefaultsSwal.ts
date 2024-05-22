import { SweetAlertOptions } from 'sweetalert2'

function useDefaultsSwal() {

  const loginSwal: SweetAlertOptions = {
    title: "Iniciando sesión..."
  }
  
  const wrongEmailSwal: SweetAlertOptions = {
    title: "Formato de correo incorrecto",
    text: "El correo debe de tener un formato correcto, ejemplo: example@gmail.com",
    icon: "error",
  }

  const wrongPasswordSwal: SweetAlertOptions = {
    title: "Formato de contrasena incorrecta",
    text: "La contrasena debe de tener 4 digitos numericos",
    icon: "error",
  }

  const emptyFieldsSwal: SweetAlertOptions = {
    title: "Ningun campo puede estar vacio",
    icon: "error",
  }

  return {wrongEmailSwal, emptyFieldsSwal, loginSwal, wrongPasswordSwal}

}

export default useDefaultsSwal
