const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../services/task.service");

const create = async (req, res, next) => {
  try {
    const task = await createTask(req.user.userId, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user.userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const task = await updateTask(
      req.user.userId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteTask(req.user.userId, req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};