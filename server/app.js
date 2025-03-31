import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js"; // Fixed path
// import questionRoutes from "./routes/questionRoutes.js";
// import answerRoutes from "./routes/answerRoutes.js";
import dbConnection from "./db/dbConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
// app.use("/api/questions", questionRoutes);
// app.use("/api/answers", answerRoutes);

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