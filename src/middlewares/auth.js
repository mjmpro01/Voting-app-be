
const jwt = require('jsonwebtoken');
const userService = require("../services/userService");
const roleService = require("../services/roleService");

// Define middleware for checking permissions
const checkPermissions = (req, res, next) => {

  // Check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be authenticated to access this resource." });
  }

  
  // Check user's permissions
  if (!req.user.permissions.includes("admin")) {
    return res.status(403).json({ message: "You do not have permission to access this resource." });
  }

  // If user is authenticated and has the required permissions, continue to the next middleware
  next();
};

const requirePermission = (permission) => {
  return async function(req, res, next) {
    const token = verifyToken(req, res, next);    
    const { userId } = jwt.decode(token);

    console.log("🚀 ~ file: auth.js:32 ~ returnfunction ~ userId:", userId)
    if (!userId) {
      res.status(403).json({ message: "Token expired" });
    }
    const user = await userService.default.prototype.findOne(userId);

    const permissions = await roleService.default.instance.findByUserId(user.roleId);
    
    if (permission && permission.includes(permission)) {
      next();
    } else {
      res.status(403).json({ message: "You do not have permission to access this resource." });
    }
  };
}

const verifyToken = (req, res) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      return bearerToken;
  } else {
      // Forbidden
      res.sendStatus(403);
  }
}

module.exports = {
  checkPermissions,
  requirePermission
}