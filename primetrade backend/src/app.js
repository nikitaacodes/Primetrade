const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/note");
const { userAuth } = require("./middleware/auth");

app.use("/auth", authRouter);
app.use("/notes", noteRouter);

// Protected route to get user info
app.get("/me", userAuth, (req, res) => {
  const { name, emailId } = req.user;
  res.json({ name, emailId });
});

// Database Connection
connectDB()
  .then(() => {
    console.log(" Database Connected");
    app.listen(7777, () => console.log("Server running on port 7777"));
  })
  .catch((err) => console.error(" DB Connection Failed:", err.message));
