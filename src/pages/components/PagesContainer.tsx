import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

function PagesContainer({children}: PropsWithChildren) {
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className="container-fluid d-flex flex-column align-items-center justify-content-center gap-2"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      {children}
    </motion.div>
  )
}

export default PagesContainer
