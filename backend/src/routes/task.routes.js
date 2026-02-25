const express = require("express");
const protect = require("../middlewares/auth.middleware");
const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/task.controller");

const router = express.Router();

router.use(protect);

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;