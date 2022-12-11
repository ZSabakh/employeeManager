const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authorization");
  if (!token) return res.status(403).send("Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};