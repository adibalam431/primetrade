function AppBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Radial Glow Layer */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary-500 opacity-30 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-500 opacity-20 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default AppBackground;