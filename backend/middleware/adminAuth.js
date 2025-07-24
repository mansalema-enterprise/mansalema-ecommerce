import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized User" });
    }

    const token = authHeader?.split(" ")[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode.email + token_decode.admin !== process.env.ADMIN_EMAIL + "true") {
      return res.status(403).json({ success: false, message: "User not authorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};


export default adminAuth;
