const { User, Role } = require("../models");
const { hashPassword } = require("../utils/passwordService");

const createUserByAdmin = async (body) => {
  const role = await Role.findOne({ where: { name: body.roleId } });

  const payload = {
    username: body.username,
    email: body.email,
    password: hashPassword(body.password),
  };

  const [user, create] = await User.findOrCreate({
    where: {
      email: body.email,
    },

    defaults: {
      ...payload,
      roleId: role.id,
    },
  });

  if (create) {
    return user;
  } else {
    throw Error("User already exists");
  }
};

const userFindAll = async () => {
  const users = await User.findAll({
    include: [
      {
        model: Role,
        attributes: ["name"],
      },
    ],
  });

  if (!users) {
    throw Error("User not find");
  }

  return users;
};

const userFindById = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw Error(`User dengan id '${userId}' tidak ditemukan`);
  }

  return user;
};

const updateUserByAdmin = async (userId, body) => {
  const user = await userFindById(userId);
  const role = await Role.findOne({ where: { name: body.role } });

  const payload = {
    username: user.username || body.username,
    email: user.email || body.email,
    password: user.password || hashPassword(body.password),
    roleId: role.id || user.roleId,
  };

  const updateUser = await user.update(payload);
  return updateUser;
};

const deleteUserByAdmin = async (userId) => {
  const user = await userFindById(userId);

  await user.destroy();
};

module.exports = {
  userFindAll,
  userFindById,
  createUserByAdmin,
  deleteUserByAdmin,
  updateUserByAdmin,
};
