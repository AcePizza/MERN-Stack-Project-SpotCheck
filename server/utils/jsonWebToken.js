import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const issueToken = (userID) => {
  const privateKey = process.env.SECRET_OR_KEY;

  const options = {
    expiresIn: "5 d",
  };

  console.log("useID", userID);

  const payload = {
    sub: userID,
  };

  const jwt = jsonwebtoken.sign(payload, privateKey, options);
  return jwt;
};

export { issueToken };
