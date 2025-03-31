import dbConnection from "../db/dbConfig.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  // console.log("Request Body:", req.body); // Debugging request body

  const { username, email, password, first_name, last_name } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Username, email and password are required",
    });
  }

  try {
    // Check if user exists
    const [existing] = await dbConnection.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await dbConnection.execute(
      "INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, first_name, last_name]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Registration error:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};



export const loginUser = async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({error:"Email and password are required"});



  }
  try {
    const [user]= await dbConnection.execute("SELECT * FROM users WHERE email = ?",[email]);
    if(user.length === 0){
      return res.status(404).json({error:"User not found Please Register first"});
    }
    const users = user[0];
    const passwordMatch = await bcrypt.compare(password,users.password_hash);
    if(!passwordMatch){
      return res.status(400).json({error:"Invalid password"});
    }
    const token = jwt.sign({user_id:users.user_id},process.env.JWT_SECRET,{expiresIn:'1h'})
res.json({token})
  } catch (error) {
    res.status(500).json({error:"Internal Server Error"})
  }
}