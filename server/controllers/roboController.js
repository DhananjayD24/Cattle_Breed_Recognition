import fs from "fs";
import path from "path";
import axios from "axios";

export async function recognizeBreedRoboflow(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Read the uploaded file and convert to base64
    const imagePath = path.resolve(req.file.path);
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

    // Send request to Roboflow
    const response = await axios.post(
      "https://serverless.roboflow.com/cattle-buffalo-breeds-v2.0-hb3bt/1",
      base64Image,
      {
        params: { api_key: process.env.ROBOFLOW_API_KEY }, // put key in .env
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    // Optionally delete the uploaded file
    fs.unlink(imagePath, () => {});

    res.json(response.data);
  } catch (err) {
    console.error("Roboflow breed recognition failed:", err);
    res.status(500).json({ error: "Roboflow breed recognition failed" });
  }
}
