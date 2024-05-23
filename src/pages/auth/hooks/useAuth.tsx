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

    const loginUserData: SendLoginDTO = SendLoginDTO;
    
    // ~~ hash password
    loginUserData.password = cifrarPassword(SendLoginDTO.password);

    // login user
    const userTokenResponse = await axiosApi
      .post<SignInRespDto>("/auth/signin", loginUserData)
      .then((resp) => resp.data)
      .catch(() => null);

    if (!userTokenResponse) return null;

    const LoginResopnse = setUpToken(userTokenResponse);

    return LoginResopnse;
  };

  const registerUser = async (
    registerDTO: RegisterDTO
  ): Promise<LoginRecibeDTO | null> => {
    
    const newUserData: RegisterDTO = registerDTO;
    
    // ~~ hash password
    newUserData.Password = cifrarPassword(registerDTO.Password);

    console.log(registerDTO)

    try {
      const userTokenResponse = await axiosApi
      .post<SignInRespDto>("/auth/signup", newUserData)
      .then((response) => {
        return response.data;
      })
      .catch(() => null);

    if (!userTokenResponse) return null;

    const LoginResopnse = setUpToken(userTokenResponse);

    return LoginResopnse;
    } catch (error) {
      console.error(error);
    }
    
    return null;

  };

  // ~~ helpers
  const setUpToken = (token: SignInRespDto ) => {
    const tokenParsed = parseJwt(token.access_token);

    if (!tokenParsed) return null;

    const LoginResopnses: LoginRecibeDTO = {
      UserData: tokenParsed.user,
      CuentaData: tokenParsed.account,
    };

    axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return LoginResopnses;
  }

  return { loginUser, registerUser };
}
