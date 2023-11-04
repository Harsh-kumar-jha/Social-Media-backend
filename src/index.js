// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectingDB from "./db/index.js";

dotenv.config({
  path: "./env",
});
connectingDB();

// first Approach

// import express from "express";
// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("Error : ", (error) => {
//       console.log("Error:", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is up and running in PORT:${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error : " + error);
//     throw error;
//   }
// })();
