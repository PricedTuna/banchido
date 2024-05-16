import { Cuenta } from "../models/Cuenta";
import { Usuario } from "../models/Usuario";

export interface LoginRecibeDTO {
  UserData: Usuario,
  CuentaData: Cuenta,
}