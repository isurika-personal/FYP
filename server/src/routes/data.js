const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("../controllers/data");

const router = express.Router();

router.post("/upload", upload.single('file'), uploadFile);

// Define other routes

module.exports = router;
