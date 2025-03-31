import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Authorization Invalid" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Authorization Invalid" });
  }
};
