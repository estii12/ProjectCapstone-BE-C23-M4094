const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt ?? req.headers.token;
console.log(token,"ini token");
  // check jwt exists & is verified
  if (token) {
    jwt.verify(token, "users secret", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res
          .status(401)
          .json({ code: 401, status: "verify token failed", errors: err });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ code: 402, status: "token is invalid" });
  }
};

module.exports = { requireAuth };
