const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const roleService = require("../services/roleService");
const constant = require('../config/config');
const requirePermission = (permission) => {
  return async function (req, res, next) {
    try {
      const { userId } = req.ctx;
      if (!userId) { 
        res.status(403).json({ message: "Token expired" });
      }
      const user = await userService.findOne(userId);

      if (permission === "Admin" && user.role === 1 || permission === "User" && user.role > 0) {
        next();
      } else {
        res
          .status(403)
          .json({
            message: "You do not have permission to access this resource.",
          });
      }
    } catch (e) {
      console.log(Error, e);
      res.sendStatus(403);
    }
  };
};

const verifyToken = () => {
  return async function (req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = bearerHeader.split(" ");
      // Get token from array
      const bearerToken = bearer[1];

      const token = jwt.verify(bearerToken, constant.PRIVATE_KEY);
      req.ctx = token;
      next();
    } else {
      res.status(403).json({message: "You do not have permission to access this resource."});
    }
    return null;
  }
};

module.exports = {
  requirePermission,
  verifyToken,
};
