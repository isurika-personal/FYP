const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Function to handle CSV file upload and processing
async function uploadFile(req, res) {
  const filePath = req.file.path;

  try {
    const pythonProcess = spawn("python", [
      path.join(__dirname, "../scripts/process_data.py"),
      filePath,
    ]);

    let stdoutData = "";
    let stderrData = "";

    pythonProcess.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderrData += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.status(200).send(stdoutData);
      } else {
        console.error(`Python process exited with code ${code}`);
        console.error(`stderr: ${stderrData}`);
        res.status(500).send(stderrData);
      }
    });
  } catch (error) {
    console.error("Error during file upload and processing:", error);
    res.status(500).send("Error during file upload and processing");
  }
}

module.exports = {
  uploadFile,
};
