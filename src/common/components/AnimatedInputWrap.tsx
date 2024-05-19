import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

function RegisterInputWrap({children}: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default RegisterInputWrap
