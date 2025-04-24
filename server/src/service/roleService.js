const { Role } = require("../models");

const getAllRole = async () => {
  const roles = await Role.findAll({ attributes: ["id", "name"] });

  return roles;
};

const createRole = async (body) => {
  const existingRole = await Role.findOne({ where: { name: body.name } });

  if (!body.name) {
    throw Error("Role name is required");
  }

  if (existingRole) {
    throw Error("Role already exists");
  }

  const newRole = await Role.create(body);

  return newRole;
};

const getRoleById = async (id) => {
  const role = await Role.findByPk(id);

  if (!role) {
    throw Error("Role not found");
  }

  return role;
};

const deleteRole = async (id) => {
  const role = await getRoleById(id);

  await role.destroy();
};

module.exports = {
  getAllRole,
  createRole,
  getRoleById,
  deleteRole,
};
