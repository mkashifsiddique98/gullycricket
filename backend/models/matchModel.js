import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
  matchName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  overs: {
    type: Number,
    required: true,
  },
  team1name: {
    type: String,
    required: true,
  },
  team2name: {
    type: String,
    required: true,
  },
  winnerTeamName: {
    type: String,
  },
});

const Match = mongoose.model("Match", matchSchema);

export default Match;
