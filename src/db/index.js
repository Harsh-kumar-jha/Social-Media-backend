import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Second Approach
const connectingDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n DB is Connected Successfully!!! Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb could not connect with Server , ERROR : ", error);
    process.exit(1);
  }
};

export default connectingDB;
