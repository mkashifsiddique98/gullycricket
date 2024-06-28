import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
     
    name: {
        type: String,
        required: true,
      },
    
      fours: {
        type: Number,
        required: true,
        default:0,
      },
      balls: {
        type: Number,
        required: true,
        default:0,
      },
      runs: {
        type: Number,
        required: true,
        default:0,
      },
      sixs: {
        type: Number,
        required: true,
        default:0,
      },
      wickets: {
        type: Number,
        required: true,
        default:0,
      },
      centuries: {
        type: Number,
        required: true,
        default:0,
      },
      fiftys: {
        type: Number,
        required: true,
        default:0,
      },
      sRate: {
        type: Number,
        required: true,
        default:0,
      },
     
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
