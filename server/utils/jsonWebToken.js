import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const issueToken = ({ useID }) => {
  const privateKey = process.env.SECRET_OR_KEY;

  const options = {
    expiresIn: "2 D",
  };

  const payload = {
    sub: useID,
  };

  const jwt = jsonwebtoken.sign(payload, privateKey, options);
  return jwt;
};

export { issueToken };
