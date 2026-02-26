function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm opacity-80">{label}</label>
      <input
        type={type}
        className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        {...props}
      />
    </div>
  );
}

export default Input;