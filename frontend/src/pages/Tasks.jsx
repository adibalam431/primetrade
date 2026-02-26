import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axios";
import GlassCard from "../component/ui/GlassCard";
import SkeletonCard from "../component/ui/SkeletonCard";
import Input from "../component/ui/Input";
import Button from "../component/ui/Button";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/tasks");
        setTasks(res.data);
      } catch {
        console.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      setCreating(true);
      const res = await axiosInstance.post("/tasks", { title });

      // Optimistic update
      setTasks((prev) => [res.data, ...prev]);
      setTitle("");
      setPanelOpen(false);
    } catch {
      console.error("Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative">
      {/* Floating Add Button */}
      <button
        onClick={() => setPanelOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow flex items-center justify-center text-2xl"
      >
        +
      </button>

      {/* Task Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !tasks.length ? (
        <div className="text-center opacity-70">
          No tasks yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <h2 className="text-lg font-semibold mb-2">
                  {task.title}
                </h2>
                <p className="opacity-70 text-sm">
                  {task.completed ? "Completed" : "Pending"}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Slide Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full glass shadow-glass p-6 z-50"
          >
            <h2 className="text-xl font-semibold mb-6">
              Create Task
            </h2>

            <div className="flex flex-col gap-4">
              <Input
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create Task"}
              </Button>

              <button
                onClick={() => setPanelOpen(false)}
                className="opacity-70 text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Tasks;