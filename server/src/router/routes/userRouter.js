const express = require("express");
const {
  getUserAllHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
} = require("../../controllers/userController");
const { authCheck, checkIsAdmin } = require("../../middleware/auth");
const { validateRegister } = require("../../middleware/validation");

const userRouter = express.Router();

userRouter.get("/", getUserAllHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.post(
  "/add",
  authCheck,
  checkIsAdmin,
  validateRegister,
  createUserHandler
);
userRouter.put("/edit/:id", authCheck, checkIsAdmin, updateUserHandler);
userRouter.delete("/delete/:id", authCheck, checkIsAdmin, deleteUserHandler);

module.exports = { userRouter };
