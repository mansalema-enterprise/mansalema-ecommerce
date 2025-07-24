import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🧾 Incoming Headers:", req.headers);
  console.log("🧾 Auth Header:", authHeader);

  const token = authHeader?.split(" ")[1];
  console.log("🔐 Extracted Token:", token);

  if (!token) {
    console.log("❌ No token provided");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id || null;
    req.isAdmin = decoded.admin || false;

    if (!req.userId && !req.isAdmin) {
      return res
        .status(401)
        .json({ message: "Invalid token: missing user ID" });
    }
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authUser;
