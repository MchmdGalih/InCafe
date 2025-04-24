const {
  getAllRole,
  createRole,
  getRoleById,
  deleteRole,
} = require("../service/roleService");

const getAllRoleHandler = async (req, res) => {
  try {
    const roles = await getAllRole();
    return res.status(200).json({ data: roles });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something wrong", error: error.message });
  }
};

const createRoleHandler = async (req, res) => {
  try {
    const newRole = await createRole(req.body);
    return res
      .status(201)
      .json({ message: "Role create successfuly", data: { role: newRole } });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something wrong", error: error.message });
  }
};

const getRoleByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await getRoleById(id);
    return res
      .status(200)
      .json({ message: `Role dengan id: ${id} ditemukan`, data: role });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something wrong", error: error.message });
  }
};

const deleteRoleHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRole(id);
    return res
      .status(200)
      .json({ message: `Role dengan id: ${id} berhasil dihapus` });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something wrong", error: error.message });
  }
};

module.exports = {
  getAllRoleHandler,
  createRoleHandler,
  getRoleByIdHandler,
  deleteRoleHandler,
};
