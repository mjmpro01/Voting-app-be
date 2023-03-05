const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const roleService = require("../services/roleService");

const requirePermission = (permission) => {
  return async function (req, res, next) {
    try {
      const token = verifyToken(req, res, next);
      const { userId } = jwt.decode(token);

      if (!userId) {
        res.status(403).json({ message: "Token expired" });
      }
      const user = await userService.default.prototype.findOne(userId);

      const permissions = await roleService.default.instance.findByUserId(
        user.roleId
      );

      if (
        (permissions && permissions.includes(permission)) ||
        permissions.includes("admin")
      ) {
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

const verifyToken = (req, res) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    return bearerToken;
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

module.exports = {
  requirePermission,
  verifyToken,
};
