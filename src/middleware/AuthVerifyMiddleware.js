let jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let Token = req.headers["token-key"];

  jwt.verify(Token, "Admin6543", function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "Unauthorized" });
    } else {
      //Get UserName From Decoded Token & Add with Req Header
      let username = decoded["data"]["UserName"];

      req.headers.username = username;
      next();
    }
  });
};
