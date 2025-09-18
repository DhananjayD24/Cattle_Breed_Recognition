import express from "express";
import {
  createAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  deleteAnimal
} from "../controllers/animalController.js";

const router = express.Router();

// CRUD
router.post("/", createAnimal);               // Add after AI prediction
router.get("/", getAnimals);                  // List all animals
router.get("/:earTag", getAnimal);           // Get single animal
router.put("/:earTag", updateAnimal);        // Update animal info
router.delete("/:earTag", deleteAnimal);     // Delete animal

export default router;
