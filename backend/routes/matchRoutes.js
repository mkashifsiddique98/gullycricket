// routes/matchRoutes.js

import express from 'express';
import {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} from '../controllers/matchController.js';

const router = express.Router();

// Routes
router.get('/', getAllMatches);
router.get('/:id', getMatchById);
router.post('/', createMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

export default router;
