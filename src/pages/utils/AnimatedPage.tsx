import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 },
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
