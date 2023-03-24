import jwt from "jsonwebtoken";

const verify = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err){
          return res
            .status(401)
            .json({ message: "invalid authorization token" });
        }
        if ((user.id = req.body.id || user.isAdmin)) {
          req.user = user;
          next();
        } else {
          res
            .status(403)
            .json({ message: "You are not allowed to perform this act." });
        }
      });
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    res.status(401).json({ message: "You are not authorized" });
  }
};

export default verify;