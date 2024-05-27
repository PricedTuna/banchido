import LandingPresence from "./components/LandingPresence";
import LoginButton from "./components/LoginButton";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <motion.div
      style={{ backgroundColor: "white" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <div
        className="d-flex justify-content-center align-items-center flex-column mb-5 p-4 ladingHeroBg"
        style={{ minHeight: "115vh" }}
      >
        <LandingPresence className="d-flex justify-content-center align-items-center flex-column">
          <h1
            style={{
              fontSize: "5rem",
              color: "white",
              textShadow: "2px 3px gray",
            }}
          >
            Banchido
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: "2rem",
              color: "white",
              textShadow: "2px 3px gray",
            }}
          >
            El banco mas chido de la FIM
          </p>
          <LandingPresence>
            <LoginButton />
          </LandingPresence>
        </LandingPresence>
      </div>
      {/* Hero */}
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "100vh", maxWidth: "80%" }}
      >
        <div className="d-flex flex-column mt-5">
          <div className="d-flex flex-column mb-2">
            <div className="row mb-5">
              <div className="col-12 col-md-8 d-flex flex-column justify-content-center">
                <LandingPresence>
                  <h4 className="mx-4 mb-3 fs-1">¿Qué es banchido?</h4>
                  <LandingPresence>
                    <p className="fs-5">
                      Banchido es un banco innovador diseñado como proyecto
                      final para la presentación de la materia de Sistemas
                      Digitales. Este proyecto combina la electrónica y el
                      software para crear un cajero automático con
                      funcionalidades avanzadas. Banchido ofrece a los usuarios
                      una experiencia completa tanto en la web como en el cajero
                      automático físico. Las principales características son:
                      <div>
                        <p className="fs-4 mt-4">Pagina web de Banchido</p>
                        <ul>
                          <li>Registro e inicio de sesion de usuarios</li>
                          <li>Consulta de saldo</li>
                          <li>Visualización del historial de transacciones</li>
                          <li>Generación de retiros sin tarjeta</li>
                        </ul>
                      </div>
                      <div>
                        <p className="fs-4 mt-4">Cajero automático banchido</p>
                        <ul>
                          <li>Retiro de efectivo</li>
                          <li>Retiro sin tarjeta</li>
                        </ul>
                      </div>
                    </p>
                  </LandingPresence>
                </LandingPresence>
              </div>
              <div className="col-12 col-md-4 d-none d-md-flex d-flex justify-content-center">
                <LandingPresence custDelay={0.4}>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1682002260078-8c1d895ec52b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Imagen de banco"
                    width={400}
                    className="img-fluid shadow-lg rounded"
                  />
                </LandingPresence>
              </div>
            </div>

            <div className="mt-5">
              <LandingPresence>
                <h4 className="mx-4 mb-3 fs-1">¿Quiénes integran banchido?</h4>
                <p className="fs-5">
                  para llevar este grán proyecto a cabo, Banchido necesitó el
                  talento de primer nivel de desarrolladores hasta diseñadores,
                  por ello el equipo final es confromado por:
                  <ul className="mt-2">
                    <li>Edgar Eduardo Vega Ruiz</li>
                    <li>Yewdiel Antonio Martinez Medina</li>
                    <li>Sara Geraldine Arredondo Soto</li>
                    <li>Angel Miguel Higuera Almada</li>
                  </ul>
                </p>
              </LandingPresence>
            </div>
          </div>
          <LandingPresence>
            <div
              className="d-flex flex-column justify-content-center m-5 px-3 card shadow"
              style={{ minHeight: "40vh", backgroundColor: "#E8F5E9" }}
            >
              <p className="text-center fs-2">
                Forma parte de nuestro proyecto:
              </p>
              <LoginButton isMain />
            </div>
          </LandingPresence>
        </div>
      </div>
    </motion.div>
  );
}

export default LandingPage;
