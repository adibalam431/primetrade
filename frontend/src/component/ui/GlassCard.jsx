import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`glass rounded-2xl shadow-glass p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;