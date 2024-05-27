import { Link } from 'react-router-dom'

interface Props {
  isMain?: boolean;
}

function LoginButton({isMain = false}: Props) {
  return (
    <button className={"btn "+(isMain ? "btn-primary" : "btn-light")+" btn-lg mt-3 p-3"}>
      <Link
        to="/login"
        className="link-offset-2 link-underline link-underline-opacity-0"
        style={{ color: isMain ? "white" : "#4CAF50" }}
      >
        Iniciar sesión
      </Link>
    </button>
  )
}

export default LoginButton