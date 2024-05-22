import cifrarPassword from "../../../common/helpers/cifrarPassword";
import { parseJwt } from "../../../common/helpers/parseJwt";
import { axiosApi } from "../../../config/api/axiosConfig";
import { SendLoginDTO } from "../../../interfaces/DTOS/auth/login/LoginDTO";
import { SignInRespDto } from "../../../interfaces/DTOS/auth/login/new/SignInRespDto";
import { LoginRecibeDTO } from "../../../interfaces/DTOS/auth/LoginRecibeDTO";
import { RegisterDTO } from "../../../interfaces/DTOS/auth/RegisterDTO";
import { Cuenta } from "../../../interfaces/models/Cuenta";
import { Usuario } from "../../../interfaces/models/Usuario";

const staticUser: Usuario = {
  _id: "99",
  Nombres: "TestGuy",
  Apellido1: "Lopez",
  Apellido2: "Lopez",
  Correo: "test@test.com",
  FechaNacimiento: "09-09-2009",
};

const staticAcount: Cuenta = {
  _id: "99",
  NumeroCuenta: "9999",
  RFID: "",
  Saldo: 99,
};

export function useAuth() {
  const loginUser = async (
    SendLoginDTO: SendLoginDTO
  ): Promise<LoginRecibeDTO | null> => {
    // Validate if the user is for test
    if (
      SendLoginDTO.correo == staticUser.Correo &&
      SendLoginDTO.password == "test"
    ) {
      const LoginResopnses: LoginRecibeDTO = {
        UserData: staticUser,
        CuentaData: staticAcount,
      };
      return LoginResopnses;
    }

    // ~ cifrate the password before send it
    // ~ SendLoginDTO.password = cifrarPassword(SendLoginDTO.password);

    // login user
    const userTokenResponse = await axiosApi
      .post<SignInRespDto>("/auth/signin", SendLoginDTO)
      .then((resp) => resp.data)
      .catch(() => null);

    if (!userTokenResponse) return null;

    const parsedJwt = parseJwt(userTokenResponse.access_token);

    if (!parsedJwt) return null;

    const LoginResopnses: LoginRecibeDTO = {
      UserData: parsedJwt.user,
      CuentaData: parsedJwt.account,
    };

    axiosApi.defaults.headers.common['Authorization'] = `Bearer ${userTokenResponse}`;

    return LoginResopnses;
  };

  const registerUser = async (
    registerDTO: RegisterDTO
  ): Promise<LoginRecibeDTO | null> => {
    // hash password
    registerDTO.Password = cifrarPassword(registerDTO.Password);

    const userResponse = await axiosApi
      .post<Usuario>("/Usuario/register", registerDTO)
      .then((response) => {
        return response.data;
      })
      .catch(() => null);

    if (!userResponse) return null;

    const cuentaResponse = await axiosApi
      .post("/Cuenta/register", { UsuarioId: userResponse._id })
      .then((response) => {
        return response.data;
      })
      .catch(() => null);

    if (!cuentaResponse) return null;

    const LoginResopnses: LoginRecibeDTO = {
      UserData: userResponse,
      CuentaData: cuentaResponse,
    };
    return LoginResopnses;
  };

  return { loginUser, registerUser };
}
