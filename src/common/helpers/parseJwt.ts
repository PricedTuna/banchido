import { jwtDecode } from "jwt-decode";
import { AuthJWTInterface } from "../../interfaces/DTOS/auth/login/new/AuthJWTInterface";

// Función para decodificar el JWT
export const parseJwt = (token: string): AuthJWTInterface | null => {
  try {
    // Decodifica el token
    const decoded = jwtDecode<AuthJWTInterface>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};