const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Force clean structure
    req.user = {
      id: decoded.id || decoded._id,
      type: decoded.type
    };

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;