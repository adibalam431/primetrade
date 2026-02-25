const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.INTERVIEWER_URL || "http://localhost:5173",
    credentials: true,
  })
);

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const User = require("./models/User");


app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(400).json({
    message: err.message || "Something went wrong",
  });
});



const protect = require("./middlewares/auth.middleware");

app.get("/api/protected-test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user.userId,
  });
});


module.exports = app;