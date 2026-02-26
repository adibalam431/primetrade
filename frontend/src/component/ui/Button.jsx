import { motion } from "framer-motion";

function Button({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow font-medium transition"
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;