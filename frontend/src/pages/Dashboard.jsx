import { useAuth } from "../context/AuthContext";
import GlassCard from "../component/ui/GlassCard";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <GlassCard>
        <h2 className="text-lg font-semibold mb-2">
          Welcome
        </h2>
        <p className="opacity-70">
          {user?.name || "User"}
        </p>
      </GlassCard>

      <GlassCard>
        <h2 className="text-lg font-semibold mb-2">
          Productivity
        </h2>
        <p className="opacity-70">
          Stay focused. Complete your tasks.
        </p>
      </GlassCard>

      <GlassCard>
        <h2 className="text-lg font-semibold mb-2">
          Secure Session
        </h2>
        <p className="opacity-70">
          JWT protected dashboard.
        </p>
      </GlassCard>
    </div>
  );
}

export default Dashboard;