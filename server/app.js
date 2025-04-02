import express from "express";
import userRoute from "./Routes/userRoute.js";
import dotenv from "dotenv";
import dbConnection from "./db/dbConfig.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/users", userRoute);

async function start() {
  try {

    await app.listen(3000);
    console.log("Database connection estalished");
    console.log("Litsening on port 3000");
  } catch (error) {
    console.log(error.message);
  }
}
start();
