require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// Project imports
const connectToDatabase = require("./database");

// Routes
const courseRoutes = require("./src/routes/course");
const user_typeRoutes = require("./src/routes/user_type");
const userRoutes = require("./src/routes/user");
const dataRoutes = require("./src/routes/data");

const app = express();

// Middleware
app.use(cors({
  origin: 'https://travel-persona.vercel.app', // Replace this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the HTTP methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Add the headers you want to allow
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the customer segmentation model");
});

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/api/course", courseRoutes);
app.use("/api/user_type", user_typeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", dataRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
