
import asyncHandler from "express-async-handler";
import Player from "../models/playerModel.js"; // Import the Player model

// @desc    Add or update player statistics
// @route   POST /api/players
// @access  Public
export const PlayerStatistics = asyncHandler(async (req, res) => {
  // Extract the data from the request
  const { inning1, inning2 } = req.body;

  // Extract player data from inning1 and inning2
  const playersData = [...inning1.batters, ...inning2.batters];

  const bowlersData = [...inning1.bowlers, ...inning2.bowlers];

  // Loop through player data and save/update each player in the Player model
  const updatedPlayers = await Promise.all(

    playersData.map(async (playerData) => {
      const {
        name,
        four,
        six,
        run,
        ball,
        strikeRate,
      } = playerData;

      // Find the player by their ID
      let player = await Player.findOne({ name });

      if (!player) {
        // If the player does not exist, create a new player instance
        player = new Player({
          
          name,
           fours:four,
           runs:run,
           sixs:six,
           balls:ball,
          centuries: 0, // Calculate centuries if needed
          fiftys: 0, // Calculate fifties if needed
           sRate:strikeRate,
           
        });
      } else {
        // If the player exists, update their statistics
        player.name = name;
        player.fours += four;
        player.sixes += six;
        player.sRate =  (player.runs+run)/(player.balls+ball)
        player.runs+=run;
        player.balls+=ball;

        // Update other fields as needed
      }

      // Save the player to the database
      return await player.save();
    })
  );

   // Loop through bowler data and save/update each bowler in the Bowler model
   const updatedBowlers = await Promise.all(
    bowlersData.map(async (bowlerData) => {
      const { name, wicket } = bowlerData;

      // Find the bowler by their name
      let bowler = await Player.findOne({ name });

      if (!bowler) {
        // If the bowler does not exist, create a new bowler instance
        bowler = new Player({
          name,
          wickets: wicket,
          // Add other fields as needed
        });
      } else {
        // If the bowler exists, update their wicket count
        bowler.wickets += +wicket;
        // Update other fields as needed
      }

      // Save the bowler to the database
      return await bowler.save();
    })
  );





  res.status(200).json({ message: "Players added/updated successfully", data: updatedPlayers });
});
// @desc     get all player
// @route   get /
// @access  Public
export const getAllPlayer = async (req, res) => {
    try {
      const pl = await Player.find();
      res.status(200).json(pl);
    
    
    
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };