import { Link } from "react-router-dom";

interface Props {
  isMain?: boolean;
}

function LoginButton({ isMain = false }: Props) {
  return (
    <Link
      to="/login"
      className={
        "btn " +
        (isMain ? "btn-primary" : "btn-light") +
        " btn-lg link-offset-2 link-underline link-underline-opacity-0 mt-3 p-3"
      }
      style={{ color: isMain ? "white" : "#4CAF50" }}
    >
      Iniciar sesión
    </Link>
  );
}

export default LoginButton;
