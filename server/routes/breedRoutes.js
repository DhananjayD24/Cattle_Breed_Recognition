import express from 'express';
import { recognizeBreed } from '../controllers/breedController.js';

const router = express.Router();
router.post('/recognize', recognizeBreed);

export default router;
