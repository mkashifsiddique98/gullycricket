// ? IN THIS FILE,  WE ARE GOING TO CREATE CONNECTION WITH THE DATABASE 🔥

// * Importing mongoose (ODM Library)
import mongoose from "mongoose";
mongoose.set("strictQuery", true);
// ! since mongoose.connect returns promise
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(` MongoDB Connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
