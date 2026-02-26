import { Outlet } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-64 glass shadow-glass p-4 md:hidden z-50"
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="mb-4"
          >
            Close
          </button>
          <Sidebar />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;