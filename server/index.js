import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { recognizeBreed } from "./controllers/breedController.js";
import { recognizeBreedRoboflow } from "./controllers/roboController.js";


dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(cors());
app.use(express.json());

// Route to upload an image and get breed prediction
app.post("/api/breed/recognize", upload.single("image"), recognizeBreed);
app.post("/api/breed/roboflow", upload.single("image"), recognizeBreedRoboflow);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
