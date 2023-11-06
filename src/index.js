// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectingDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 8000;

connectingDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed : ${err}`);
  });
