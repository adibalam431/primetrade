import { motion } from "framer-motion";
import GlassCard from "../component/ui/GlassCard";
import Input from "../component/ui/Input";
import Button from "../component/ui/Button";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <GlassCard>
          <h1 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            Create Account
          </h1>

          <form className="flex flex-col gap-4">
            <Input label="Name" />
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <Button>Register</Button>
          </form>

          <p className="text-sm opacity-70 mt-6 text-center">
            Already have an account? Login
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default Register;