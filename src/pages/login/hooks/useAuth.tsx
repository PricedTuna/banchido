import { axiosApi } from "../../../config/api/axiosConfig";
import { LoginDTO } from "../../../interfaces/DTOS/LoginDTO";
import { LoginRecibeDTO } from "../../../interfaces/DTOS/LoginRecibeDTO";
import { RegisterDTO } from "../../../interfaces/DTOS/RegisterDTO";
import { Usuario } from "../../../interfaces/models/Usuario";

export function useAuth() {
  const loginUser = async (loginDTO: LoginDTO): Promise<LoginRecibeDTO | null> => {
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
    const userResponse = await axiosApi
      .post<Usuario>("/Usuario/register", registerDTO)
      .then((response) => {
        return response.data;
      })
      .catch(() => null);

      if(!userResponse)
        return null;

      console.log({userResponse});
      console.log(userResponse.id);
      


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
