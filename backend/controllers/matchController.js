// controllers/matchController.js

import asyncHandler from "express-async-handler";
import Match from "../models/matchModel.js";

// @desc    Get all matches
// @route   GET /api/matches
// @access  Public
export const getAllMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find({});
  res.json(matches);
});

// @desc    Get a single match by ID
// @route   GET /api/matches/:id
// @access  Public
export const getMatchById = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ message: "Match not found" });
  }
});

// @desc    Create a new match
// @route   POST /api/matches
// @access  Public
export const createMatch = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const match = new Match({
    matchName: req.body.values.matchName,
    location: req.body.values.location,
    date: currentDate,
    overs: req.body.values.maxOver,
    team1name: req.body.values.team1,
    team2name: req.body.values.team2,
  });
  console.log(match);
  const createdMatch = await match.save();
  res.status(201).json(createdMatch);
});

// @desc    Update a match by ID
// @route   PUT /api/matches/:id
// @access  Public
export const updateMatch = asyncHandler(async (req, res) => {
  const {
    matchName,
    location,
    date,
    overs,
    team1name,
    team2name,
    winnerTeamName,
  } = req.body;
  const match = await Match.findById(req.params.id);
  console.log(req.body)
  if (match) {
    
    match.winnerTeamName = winnerTeamName;

    const updatedMatch = await match.save();
    console.log(updatedMatch);
    res.json(updatedMatch);
  } else {
    res.status(404).json({ message: "Match not found" });
  }
});

// @desc    Delete a match by ID
// @route   DELETE /api/matches/:id
// @access  Public
export const deleteMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (match) {
    await match.remove();
    res.json({ message: "Match removed" });
  } else {
    res.status(404).json({ message: "Match not found" });
  }
});
