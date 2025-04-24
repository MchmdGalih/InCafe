const express = require("express");

const {
  validateLogin,
  validateRegister,
} = require("../../middleware/validation");
const {
  signInHandler,
  signUpHandler,
} = require("../../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signin", validateLogin, signInHandler);
authRouter.post("/signup", validateRegister, signUpHandler);
module.exports = { authRouter };
