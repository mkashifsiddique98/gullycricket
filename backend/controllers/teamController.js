import Team from "../models/teamModel.js";

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// Controller function to find a team by its name
const getByTeamName = async (req, res) => {
  const { teamName } = req.params;

  try {
    const team = await Team.findOne({ teamName });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.json(team);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
// Create a new team
const createTeam = async (req, res) => {
  const { teamName, players } = req.body;
  try {
    const newTeam = await Team.create({ teamName, players });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update team by ID
const updateTeam = async (req, res) => {
  const { teamName, players } = req.body;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { teamName },
      { new: true }
    );

    if (updatedTeam) {
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Delete team by ID
const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndRemove(req.params.id);

    if (deletedTeam) {
      res.json({ message: "Team deleted successfully" });
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};
//* ======================================================================
//  Players Controllers
//  ======================================================================

// Get all players from a specific team
const getAllPlayersFromTeam = async (req, res) => {
  try {
    const teamName = req.params.teamName;
    const team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team.players);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new player for a specific team
export const createPlayer = async (req, res) => {
  try {
    const teamName = req.params.teamName;

    const team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    // team.players = team.players.concat(req.body.playerList);
    // console.log(team.players);
    // await team.save();
    const excludedPlayerNames = team.players.map((player) => player.value);

    // Filter the incoming playerList array to exclude specific names
    const filteredPlayerList = req.body.playerList.filter(
      (player) => !excludedPlayerNames.includes(player.value)
    );
  
    // Concatenate the filtered playerList with the existing team players array
    team.players = team.players.concat(filteredPlayerList);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing player from a specific team
export const updatePlayer = async (req, res) => {
  try {
    const teamName = req.params.teamName;
    const playerId = req.params.playerId;

    const team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const player = team.players.id(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    player.value = req.body.value;
    await team.save();

    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an existing player from a specific team
export const deletePlayer = async (req, res) => {
  try {
    const teamName = req.params.teamName;
    const playerId = req.params.playerId;

    const team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.players.id(playerId).remove();
    await team.save();

    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllTeams, createTeam, updateTeam, deleteTeam,getAllPlayersFromTeam };
