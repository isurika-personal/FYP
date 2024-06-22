require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// project imports
const connectToDatabase = require("./database");

// Routes
const courseRoutes = require("./src/routes/course");
const user_typeRoutes = require("./src/routes/user_type");
const userRoutes = require("./src/routes/user");
const dataRoutes = require("./src/routes/data");

const app = express();

// Allow CORS requests from your frontend URL
app.use(
  cors({
    origin: "https://travel-persona.vercel.app", // Replace this with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Add the HTTP methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
  })
);

const PORT = process.env.PORT || 5000;

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the student management system");
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/api", courseRoutes);
app.use("/api", user_typeRoutes);
app.use("/api", userRoutes);
app.use("/api", dataRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
