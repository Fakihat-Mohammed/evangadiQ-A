import dbConnection from "../db/dbConfig.js";
import bcrypt from "bcrypt";
import StatusCodes from "http-status-codes";

async function register(req, res) {
  const { username, first_name, last_name, email, password_hash } = req.body;
  if (!username || !first_name || !last_name || !email || !password_hash) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all required fields!!" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username,user_id FROM Users WHERE username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already existed" });
    }
    if (password_hash.length < 9) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "password must be greater than 8 characters" });
    }
    // encryption

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_hash, salt);
    await dbConnection.query(
      "INSERT INTO users (username,first_name,last_name,email,password_hash) VALUES (?,?,?,?,?)",
      [username, first_name, last_name, email, hashedPassword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User successfully registered" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An expected error occurred" });
  }
}
export default register;
