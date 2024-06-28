// routes/teamRoutes.js
import express from 'express';
import {
  // Team
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  // Players 
  getAllPlayersFromTeam,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../controllers/teamController.js';


const router = express.Router();

router.get('/', getAllTeams); 
router.post('/', createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

// * ======================================
// Players
// ========================================

// Get all players from a specific team
router.get('/player-teams/:teamName/players', getAllPlayersFromTeam);

// Create a new player for a specific team
router.post('/player-teams/:teamName/players', createPlayer);

// Update an existing player from a specific team
router.put('/player-teams/:teamName/players/:playerId', updatePlayer);

// Delete an existing player from a specific team
router.delete('/player-teams/:teamName/players/:playerId', deletePlayer);



export default router;
