const { verifyPassword } = require("../utils/passwordService");
const { User, Role } = require("../models");

const userSignin = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    include: {
      model: Role,
      attributes: ["name"],
    },
  });

  if (!user) {
    throw Error("Kredensial tidak valid. User tidak ditemukan");
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    throw Error("Kredensial tidak valid. Password salah");
  }

  return user;
};

module.exports = { userSignin };
