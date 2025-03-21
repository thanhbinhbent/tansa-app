import { motion } from "framer-motion";

const AnimatedWallet = () => {
  return (
    <motion.svg
      className="text-gray-800 dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      fill="none"
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient màu động với màu chủ đạo của Ant Design */}
      <defs>
        <linearGradient id="gradientColor" gradientTransform="rotate(0)">
          <motion.stop
            offset="0%"
            stopColor="#1677ff"
            animate={{ stopColor: ["#1677ff", "#69b1ff", "#1677ff"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatType: "mirror",
            }}
          />
          <motion.stop
            offset="100%"
            stopColor="#69b1ff"
            animate={{ stopColor: ["#69b1ff", "#1677ff", "#69b1ff"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatType: "mirror",
            }}
          />
        </linearGradient>
      </defs>

      <motion.path
        stroke="url(#gradientColor)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3" // Giảm stroke nhỏ hơn
        d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export default AnimatedWallet;
