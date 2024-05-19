import cifrarPassword from "../../../common/helpers/cifrarPassword";
import { axiosApi } from "../../../config/api/axiosConfig";
import { LoginDTO } from "../../../interfaces/DTOS/auth/LoginDTO";
import { LoginRecibeDTO } from "../../../interfaces/DTOS/auth/LoginRecibeDTO"; 
import { RegisterDTO } from "../../../interfaces/DTOS/auth/RegisterDTO";
import { Cuenta } from "../../../interfaces/models/Cuenta";
import { Usuario } from "../../../interfaces/models/Usuario";

const staticUser: Usuario = {
  id: 99,
  nombres: "TestGuy",
  apellido1: "Lopez",
  apellido2: "Lopez",
  correo: "test@test.com",
  fechaNacimiento: "09-09-2009",
}

const staticAcount: Cuenta = {
  id: 99,
  numeroCuenta: "9999",
  RFID: "",
  saldo: 99,
}

export function useAuth() {

  const loginUser = async (loginDTO: LoginDTO): Promise<LoginRecibeDTO | null> => {

    if(loginDTO.correo == staticUser.correo && loginDTO.password == "test"){
      const LoginResopnses: LoginRecibeDTO = {UserData: staticUser, CuentaData: staticAcount}
      return LoginResopnses;
    }

    const userResponse = await axiosApi
      .post<Usuario>("/Usuario/login", loginDTO)
      .then((response) => {
        return response.data;
      })
      .catch(() => null);

      if(!userResponse)
        return null;
      
      const cuentaResponse = await axiosApi
        .post("/Cuenta/login", {UsuarioId: userResponse.id})
        .then((response) => {
          return response.data;
        })
        .catch(() => null);

      if(!cuentaResponse)
        return null;

      const LoginResopnses: LoginRecibeDTO = {UserData: userResponse, CuentaData: cuentaResponse}
      return LoginResopnses;
  };

  const registerUser = async (registerDTO: RegisterDTO): Promise<LoginRecibeDTO | null> => {

    // hash password
    registerDTO.Password = cifrarPassword(registerDTO.Password);

    const userResponse = await axiosApi
      .post<Usuario>("/Usuario/register", registerDTO)
      .then((response) => {
        return response.data;
      })
      .catch(() => null);

      if(!userResponse)
        return null;

      const cuentaResponse = await axiosApi
        .post("/Cuenta/register", {UsuarioId: userResponse.id })
        .then((response) => {
          return response.data;
        })
        .catch(() => null);

      if(!cuentaResponse)
        return null;


      const LoginResopnses: LoginRecibeDTO = {UserData: userResponse, CuentaData: cuentaResponse}
      return LoginResopnses;
  };

  return {loginUser, registerUser};
}
