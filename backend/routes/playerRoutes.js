import express from 'express';
import {
  PlayerStatistics,
  getAllPlayer
} from '../controllers/PlayerController.js';

const router = express.Router();

// Routes
 
router.post('/', PlayerStatistics);
router.get('/', getAllPlayer);
 

export default router;
