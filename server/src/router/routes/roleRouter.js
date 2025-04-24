const express = require("express");
const {
  getAllRoleHandler,
  createRoleHandler,
  getRoleByIdHandler,
  deleteRoleHandler,
} = require("../../controllers/roleController");
const { authCheck, checkIsAdmin } = require("../../middleware/auth");

const roleRouter = express.Router();

roleRouter.get("", getAllRoleHandler);
roleRouter.post("/add", authCheck, checkIsAdmin, createRoleHandler);
roleRouter.get("/:id", getRoleByIdHandler);
roleRouter.delete("/delete/:id", authCheck, checkIsAdmin, deleteRoleHandler);

module.exports = { roleRouter };
