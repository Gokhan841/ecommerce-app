import { motion } from "framer-motion";

const AnimatedBorderButton = () => {
  return (
    <div className="relative inline-block">
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-full p-[12px]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      >
        <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,_#ff0080,_#7928ca,_#2afadf,_#ff0080)]"></div>
      </motion.div>

      {/* Actual button */}
      <button className="relative z-10 rounded-full bg-white text-black px-6 py-3 font-semibold">
        Tıkla
      </button>
    </div>
  );
};

export default AnimatedBorderButton;
