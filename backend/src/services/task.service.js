const Task = require("../models/Task");

const createTask = async (userId, { title }) => {
  if (!title || !title.trim()) {
    throw new Error("Title is required");
  }

  const task = await Task.create({
    title: title.trim(),
    userId,
  });

  return task;
};

const getTasks = async (userId) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};

const updateTask = async (userId, taskId, updateData) => {
  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    throw new Error("Task not found");
  }

  if (updateData.title !== undefined) {
    task.title = updateData.title.trim();
  }

  if (updateData.completed !== undefined) {
    task.completed = updateData.completed;
  }

  await task.save();

  return task;
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return;
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};