const jwt = require("jsonwebtoken");

const createToken = async ({ id, username, role }) => {
  const token = await jwt.sign(
    { id, username, role },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const verifyToken = async (token) => {
  const isValid = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  if (!isValid) {
    throw new Error("Token is not valid");
  }

  return isValid;
};

const decodeToken = async (token) =>
  jwt.decode(token, process.env.JWT_SECRET_TOKEN);

module.exports = { createToken, verifyToken, decodeToken };
