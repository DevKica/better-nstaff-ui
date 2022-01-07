import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedPage = ({ children }: { children: any }) => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={animations} transition={pageTransition}>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
