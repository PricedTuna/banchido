import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  custDelay?: number,
  custDuration?: number,
  className?: string,
}

function LandingPresence({ children, custDelay=0, custDuration=1.5, className ="" }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial="offscreen"
        whileInView="onscreen"
        variants={{
          offscreen: {
            y: "20%",
            opacity: 0,
          },
          onscreen: {
            y: "0%",
            opacity: 1,
            transition: {
              type: "spring",
              duration: custDuration,
              delay: custDelay
            }
          }
        }}

      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default LandingPresence;
