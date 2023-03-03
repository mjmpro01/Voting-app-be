
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
