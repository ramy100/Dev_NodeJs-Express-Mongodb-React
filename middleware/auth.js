const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "no token , authorization denied" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; //setting req.user to the user returned in token
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
