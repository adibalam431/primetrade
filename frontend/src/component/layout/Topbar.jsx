import { useAuth } from "../../context/AuthContext";

function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between px-6 py-4 glass shadow-glass">
      <button
        onClick={onMenuClick}
        className="md:hidden text-lg opacity-70 hover:opacity-100"
      >
        ☰
      </button>

      <div className="ml-auto flex items-center gap-3">
        <div className="text-sm opacity-80">
          {user?.name || "User"}
        </div>
      </div>
    </div>
  );
}

export default Topbar;