import { motion } from "framer-motion";

const AnimatedWallet = () => {
  return (
    <motion.svg
      width="150"
      height="150"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0.9, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <motion.path
        d="M3 7H21V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z"
        fill="#1677ff"
        stroke="#003a8c"
        strokeWidth="1"
        initial={{ y: 0 }}
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M16 7V5C16 3.9 15.1 3 14 3H5C3.9 3 3 3.9 3 5V7"
        fill="#69c0ff"
        stroke="#003a8c"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ y: 0 }}
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.rect
        x="18"
        y="10"
        width="4"
        height="4"
        fill="#52c41a"
        stroke="#003a8c"
        strokeWidth="1"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <circle cx="20" cy="12" r="0.5" fill="#fff" />
    </motion.svg>
  );
};

export default AnimatedWallet;
