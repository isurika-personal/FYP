const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database");

const courseRoutes = require("./src/routes/course");
const user_typeRoutes = require("./src/routes/user_type");
const userRoutes = require("./src/routes/user");
const dataRoutes = require("./src/routes/data");

// Load environment variables from .env file
require("dotenv").config();

// HTTPS options
const httpsOptions = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/devapicrm.sltc.ac.lk/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/devapicrm.sltc.ac.lk/fullchain.pem"
  ),
};

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the student management system");
});

// Routes
app.use("/api", courseRoutes);
app.use("/api", user_typeRoutes);
app.use("/api", userRoutes);
app.use("/api", dataRoutes);

// Connect to MongoDB
connectToDatabase();

// Start the HTTPS server
const PORT = process.env.PORT || 443;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
