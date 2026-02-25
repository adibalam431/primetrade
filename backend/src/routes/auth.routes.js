const express = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/auth.validation");

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;