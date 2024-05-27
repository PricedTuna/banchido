import { Link } from 'react-router-dom'

function LoginButton() {
  return (
    <button className="btn btn-light btn-lg mt-3">
      <Link
        to="/login"
        className="link-offset-2 link-underline link-underline-opacity-0"
        style={{ color: "#4CAF50" }}
      >
        Iniciar sesión
      </Link>
    </button>
  )
}

export default LoginButton