import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

function AuthContainer({children}: PropsWithChildren) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      
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
    </motion.div>
  );
}

export default AuthContainer;
