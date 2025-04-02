import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();
async function authMiddleware(req,res,next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"Authorization Invalid"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const {username,userid}=jwt.verify(token,process.env.JWT_SECRET)
        req.user = {username,userid};
        next()
    } catch (error) {
         return res
           .status(StatusCodes.UNAUTHORIZED)
           .json({ message: "Authorization Invalid" });
    }
}
export default authMiddleware