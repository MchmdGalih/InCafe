const express = require("express");
const {
  getAllProductHandler,
  getProductByIdHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
} = require("../../controllers/productController");
const { uploadImage } = require("../../middleware/uploadFile");
const { validateProducts } = require("../../middleware/validation");
const { authCheck, checkIsAdmin } = require("../../middleware/auth");

const productRouter = express.Router();

productRouter.post(
  "/add",
  authCheck,
  checkIsAdmin,
  uploadImage("image_cover"),
  validateProducts,
  createProductHandler
);
productRouter.get("", getAllProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.put(
  "/edit/:id",
  authCheck,
  checkIsAdmin,
  uploadImage("image_cover"),
  validateProducts,
  updateProductHandler
);
productRouter.delete(
  "/delete/:id",
  authCheck,
  checkIsAdmin,
  deleteProductHandler
);

module.exports = { productRouter };
