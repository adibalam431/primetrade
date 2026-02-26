import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../api/axios";
import GlassCard from "../component/ui/GlassCard";
import Input from "../component/ui/Input";
import Button from "../component/ui/Button";

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      await axiosInstance.post("/auth/register", data);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input label="Name" {...register("name")} />
            <Input label="Email" type="email" {...register("email")} />
            <Input label="Password" type="password" {...register("password")} />

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <Button disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default Register;