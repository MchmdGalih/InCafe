const { matchedData } = require("express-validator");
const {
  userFindAll,
  userFindById,
  createUserByAdmin,
  deleteUserByAdmin,
  updateUserByAdmin,
} = require("../service/userService");

const getUserAllHandler = async (req, res) => {
  try {
    const user = await userFindAll();

    return res.status(200).json({
      message: "User find All success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const createUserHandler = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { role } = req.body;

    const newUser = await createUserByAdmin({
      username: validatedData.username,
      email: validatedData.email,
      password: validatedData.password,
      roleId: role,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userFindById(id);
    res.status(200).json({
      message: `User dengan ${id} ditemukan`,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);

    const user = await updateUserByAdmin(id, req.body);

    return res.status(200).json({
      message: `User dengan ${id} berhasil diupdate`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserByAdmin(id);
    return res.status(200).json({
      message: `User dengan ${id} berhasil dihapus`,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

module.exports = {
  getUserAllHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
};
