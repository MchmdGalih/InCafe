const { matchedData } = require("express-validator");
const { User, Role } = require("../models");
const { hashPassword } = require("../utils/passwordService");
const { userSignin } = require("../service/authService");
const { createToken } = require("../token/tokenManager");

const signInHandler = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const user = await userSignin({
      email: validatedData.email,
      password: validatedData.password,
    });

    const { id, username, email } = user;
    const role = user.Role?.name;

    const accessToken = await createToken({ id, username, role });
    const userData = {
      id,
      username,
      email,
      role,
    };

    return res.status(200).json({
      message: "User login success",
      data: {
        user: userData,
        accessToken,
      },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const signUpHandler = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const payload = {
      username: validatedData.username,
      email: validatedData.email,
      password: hashPassword(validatedData.password),
    };

    const role = await Role.findOne({ where: { name: "user" } });

    const [user, create] = await User.findOrCreate({
      where: { email: validatedData.email },
      defaults: { ...payload, roleId: role.id },
    });

    if (create) {
      return res.status(201).json({
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { signUpHandler, signInHandler };
