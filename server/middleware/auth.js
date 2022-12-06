import jwt from "jsonwebtoken";
import users from "../Model/UserModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isVerifiedToken = jwt.verify(token, process.env.jwtkey);
    req.user = await users.findOne({
      _id: isVerifiedToken.id,
      "tokens.token": token,
    });
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
