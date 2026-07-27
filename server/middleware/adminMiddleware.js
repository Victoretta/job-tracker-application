const admin = (req, res, next) => {
  // Check if the logged-in user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }

  next();
};

module.exports = admin;