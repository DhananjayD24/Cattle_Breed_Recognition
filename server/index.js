import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { recognizeBreed } from "./controllers/breedController.js";
import { recognizeBreedRoboflow } from "./controllers/roboController.js";
import animalRoutes from "./routes/animalRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(cors({ origin: "" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Route to upload an image and get breed prediction
app.post("/api/breed/recognize", upload.single("image"), recognizeBreed);
app.post("/api/breed/roboflow", upload.single("image"), recognizeBreedRoboflow);
app.use("/api/animals", animalRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
