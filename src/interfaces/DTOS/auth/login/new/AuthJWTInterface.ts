import { Cuenta } from "../../../../models/Cuenta";

export interface AuthJWTInterface {
  sub:     string;
  user:    User;
  account: Account;
  iat:     number;
  exp:     number;
}

export interface Account extends Cuenta {
  _id:          string;
  NumeroCuenta: string;
  Saldo:        number;
  RFID:         string;
  __v:          number;
}

export interface User {
  _id:       string;
  Nombres:   string;
  Apellido1: string;
  Apellido2: string;
  Correo:    string;
  FechaNacimiento: string,
  __v:       number;
}
