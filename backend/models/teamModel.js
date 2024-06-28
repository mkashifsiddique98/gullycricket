import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const teamSchema = mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  players: [playerSchema],
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
