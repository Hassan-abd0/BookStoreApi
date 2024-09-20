const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//verify token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invaled token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

//verify token & authorization user
function verifyaTokenAndAuthorizationUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "you are not allowed",
      });
    }
  });
}

//verify token & authorization admin
function verifyaTokenAndAuthorizationAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "you are not allowed",
      });
    }
  });
}

module.exports = {
  verifyToken,
  verifyaTokenAndAuthorizationUser,
  verifyaTokenAndAuthorizationAdmin,
};
