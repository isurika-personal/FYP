require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./database");

// Import routes
const user_typeRoutes = require("./src/routes/user_type");
const userRoutes = require("./src/routes/user");
const dataRoutes = require("./src/routes/data");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: "https://travel-persona.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Allow the headers you need
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/api", user_typeRoutes);
app.use("/api", userRoutes);
app.use("/api", dataRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the student management system");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
