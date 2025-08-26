import jwt from "jsonwebtoken";
import User from '../models/user.js'; // Ensure this path is correct

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authentication token is required." });
    }

    const token = authHeader.split(" ")[1];
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(tokenDecode.id).select('-password');

    if (!user) {
        return res.status(401).json({ success: false, message: "User not found." });
    }

    req.user = user;
    
    next(); 

  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authUser;