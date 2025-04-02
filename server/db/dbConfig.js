import mysql from "mysql2/promise"; // Use the promise-based version of mysql2
import dotenv from "dotenv";

dotenv.config();

const dbConnection = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default dbConnection;
