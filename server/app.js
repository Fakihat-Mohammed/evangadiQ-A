import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js"; // Fixed path
import questionRoute from "./Routes/questionRoute.js";
import answerRoute from "./Routes/answerRoute.js";
import dbConnection from "./db/dbConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// app.use(cors());
app.use(express.json());

// Routes
app.use(bodyParser.json())
app.use("/api/users", userRoute);
app.use("/api", questionRoute);
app.use("/api/answers", answerRoute);


// Test DB connection
async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test' ");
    await app.listen(PORT);
    console.log("database connection established");
    console.log(`listeninig on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();