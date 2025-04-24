const express = require("express");
const {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
} = require("../../controllers/categoryController");
const { authCheck, checkIsAdmin } = require("../../middleware/auth");

const categoriesRouter = express.Router();
categoriesRouter.get("", getAllCategoriesHandler);
categoriesRouter.get("/:id", getCategoryByIdHandler);
categoriesRouter.post("/add", authCheck, checkIsAdmin, createCategoryHandler);
categoriesRouter.put(
  "/edit/:id",
  authCheck,
  checkIsAdmin,
  updateCategoryHandler
);
categoriesRouter.delete(
  "/delete/:id",
  authCheck,
  checkIsAdmin,
  deleteCategoryHandler
);

module.exports = { categoriesRouter };
