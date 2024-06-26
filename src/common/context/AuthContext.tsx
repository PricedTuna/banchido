import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { Usuario } from "../../interfaces/models/Usuario"; 
import { Cuenta } from "../../interfaces/models/Cuenta"; 
import { LoginRecibeDTO } from "../../interfaces/DTOS/auth/LoginRecibeDTO"; 
import { User } from "../../interfaces/DTOS/auth/login/new/AuthJWTInterface";

// Tipo de estado (STATE)
interface AuthState {
  isLoggedIn: boolean;
  userData?: Usuario;
  cuentaData?: Cuenta;
  token?: string;
}

export const enum REDUCER_ACTION_TYPE {
  LOGIN,
  LOGOUT,
  PATCH_CUENTA,
  PATCH_USER,
}

// Acciones del dispatch
type Action = {
  type: REDUCER_ACTION_TYPE;
  userData?: Usuario;
  cuentaData?: Cuenta;
  token?: string;
};

// estado inicial (STATE)
export const initialState: AuthState = {
  isLoggedIn: false,
  userData: {
    _id: "",
    Apellido1: "",
    Apellido2: "",
    Correo: "",
    FechaNacimiento: "",
    Nombres: "",
  },
  cuentaData: {
    _id: "",
    NumeroCuenta: "",
    RFID: "",
    Saldo: 0.0,
  },
};

// Creacion del reducer
const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.userData,
        cuentaData: action.cuentaData,
        token: action.token,
      };
    case REDUCER_ACTION_TYPE.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REDUCER_ACTION_TYPE.PATCH_CUENTA:
      return {
        ...state,
        cuentaData: action.cuentaData,
      };
    case REDUCER_ACTION_TYPE.PATCH_USER:
      return {
        ...state,
        userData: action.userData,
      };
    default:
      return state;
  }
};

// Creacion del useContext
const useAuthContext = (initState: AuthState) => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const login = useCallback((UsuarioLogin: LoginRecibeDTO, token: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.LOGIN,
      cuentaData: UsuarioLogin.CuentaData,
      userData: UsuarioLogin.UserData,
      token: token,
    });
  }, []);

  const patchAccData = useCallback((cuentaData: Cuenta) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PATCH_CUENTA,
      cuentaData: cuentaData,
    });
  }, []);

  const patchUserData = useCallback((userData: User) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PATCH_CUENTA,
      userData: userData,
    });
  }, []);

  const logout = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.LOGOUT,
    });
  }, []);

  return { state, login, logout, patchAccData, patchUserData };
};

type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initContextState: UseAuthContextType = {
  state: initialState,
  login: () => {},
  patchAccData: () => {},
  logout: () => {},
  patchUserData: () => {},
};

// Creacion del contexto
const AuthContext = createContext<UseAuthContextType>(initContextState);

const AuthProvider = ({
  children,
  ...initState
}: PropsWithChildren & AuthState) => {
  return (
    <AuthContext.Provider value={useAuthContext(initState)}>
      {children}
    </AuthContext.Provider>
  );
};

type useUserAndCountInfoType = {
  nombres: string;
  apellidos: string;
  numeroCuenta: string;
  saldo: number;
};

export const useUserAndCountInfo = (): useUserAndCountInfoType | undefined => {
  const {
    state: { userData, cuentaData },
  } = useContext(AuthContext);
  if (userData === undefined || cuentaData === undefined) return undefined;

  const userAndCountInfo: useUserAndCountInfoType = {
    nombres: userData.Nombres,
    apellidos: `${userData.Apellido1} ${userData.Apellido2}`,
    numeroCuenta: cuentaData.NumeroCuenta,
    saldo: cuentaData.Saldo,
  };

  return userAndCountInfo;
};

export const useUserInfo = (): Usuario | undefined => {
  const {
    state: { userData },
  } = useContext(AuthContext);
  if (userData === undefined) return undefined;

  return userData;
}

export const useCuentaInfo = (): Cuenta | undefined => {
  const {
    state: { cuentaData },
  } = useContext(AuthContext);
  if (cuentaData === undefined) return undefined;

  return cuentaData;
}

export const useAuthToken = () => {
  const {state: {token}} = useContext(AuthContext);

  return token;
}

export { AuthContext, AuthProvider };
