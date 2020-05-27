const { toData } = require("./jwt");
const User = require("../models").user;

const authMiddleware = async (req, res, next) => {
  // 1. Check if there is an authorization header with a token.
  const authHeader =
    req.headers.authorization && req.headers.authorization.split(" ");
  //[Bearer, <token>]
  if (authHeader && authHeader[0] === "Bearer" && authHeader[1]) {
    //2. Decode the token, to get the userID back
    try {
      const data = toData(authHeader[1]);
      //3. add the user to the request object
      const user = await User.findByPk(data.userId);

      if (!user) {
        res.status(404).send("User doesn't exit");
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(400).send(`${error.name}, ${error.message}`);
    }
  } else {
    res.status(400).send("Bad request missing authorization header");
  }
};

module.exports = authMiddleware;
