// server/routes/statsRoutes.js
import express from "express";
import {
  overview,
  breeds,
  ageDistribution,
  lowConfidence,
  byOwner,
  monthlyRegistrations
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/overview", overview);                // /api/stats/overview
router.get("/breeds", breeds);                    // /api/stats/breeds
router.get("/age-distribution", ageDistribution); // /api/stats/age-distribution
router.get("/low-confidence", lowConfidence);     // /api/stats/low-confidence?threshold=0.7
router.get("/by-owner", byOwner);                 // /api/stats/by-owner
router.get("/monthly", monthlyRegistrations);     // /api/stats/monthly

export default router;
