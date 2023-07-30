const jwt = require("jsonwebtoken");
const User = require("../service");

const secretKey = "Demag0g";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decodedToken = jwt.verify(token, secretKey);

    const user = await User.findById(decodedToken.id);

    if (!user || user.token !== token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = authenticateToken;
