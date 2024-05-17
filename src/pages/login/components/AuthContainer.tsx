import { PropsWithChildren } from "react";

function AuthContainer({children}: PropsWithChildren) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-4"
      style={{ height: "100vh" }}
    >
      <div
        className="container px-2 py-4 loginContainer rounded shadow-lg"
        style={{ maxWidth: "40rem" }}
      >
        <h1 className="text-center mb-4">Banchido</h1>

        {children}

      </div>
    </div>
  );
}

export default AuthContainer;
