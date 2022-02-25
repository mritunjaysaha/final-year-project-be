require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const examRoutes = require("./routes/exam");
const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
// initialize app
const app = express();

// connect database
connectDB();

// initialize middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ extend: false }));

// my routes
app.get("/", (req, res) => res.send("Server is active"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);

module.exports = { app };
