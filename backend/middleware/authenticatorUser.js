import jwt from "jsonwebtoken";
import { client } from "../connection_establishment.js";
import User from "../database/schemas/user_schema.js";
const authenticator = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.JWT_KEY);
    // console.log(user);

    const isBlocked = await client.get(`Blocked-Token:${token}`);
    if(isBlocked)
    {
        res.status(401).send("Token Expired");
    }

    req.user = await User.findOne({email_id:user.email_id});
    // console.log(req.user)

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
  }
};
export default authenticator;
