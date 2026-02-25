import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import DashboardLayout from "./component/layout/DashboardLayout";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <AppBackground>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes (temporary unprotected for now) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/tasks" element={<Tasks />} />

        {/* Nested dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AppBackground>
  );
}

export default App;
