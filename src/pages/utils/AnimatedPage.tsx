// import { motion } from "framer-motion";

// const animations = {
//   initial: { opacity: 0 },
//   in: { opacity: 1 },
//   out: { opacity: 0 },
// };

// const pageTransition = {
//   ease: "anticipate",
//   duration: 0.35,
// };

const AnimatedPage = ({ children }: { children: any }) => {
  return (
    <div>
      {/* <motion.div initial="initial" animate="in" exit="out" variants={animations} transition={pageTransition}> */}
      {children}
      {/* </motion.div> */}
    </div>
  );
};

export default AnimatedPage;
