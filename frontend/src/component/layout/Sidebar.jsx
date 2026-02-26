import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 240 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col glass shadow-glass h-screen p-4"
      >
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h1 className="text-lg font-semibold">Knit Dashboard</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-sm opacity-70 hover:opacity-100"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="/dashboard"
            className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/tasks"
            className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Tasks
          </NavLink>
        </nav>
      </motion.aside>
    </>
  );
}

export default Sidebar;