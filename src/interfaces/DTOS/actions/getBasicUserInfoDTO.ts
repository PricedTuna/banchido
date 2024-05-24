export interface getBasicUserInfoDTO {
  user: {
    _id: string;
    Nombres: string;
    Apellido1: string;
    Apellido2: string;
  };
  account: {
    _id: string;
    numeroCuenta: string;
  };
}
