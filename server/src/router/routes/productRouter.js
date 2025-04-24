const express = require("express");
const {
  getAllProductHandler,
  getProductByIdHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
} = require("../../controllers/productController");
const { uploadImageProduct } = require("../../middleware/uploadFile");
const { validateProducts } = require("../../middleware/validation");
const { authCheck, checkIsAdmin } = require("../../middleware/auth");

const productRouter = express.Router();

productRouter.post(
  "/add",
  authCheck,
  checkIsAdmin,
  uploadImageProduct,
  validateProducts,
  createProductHandler
);
productRouter.get("", getAllProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.put(
  "/edit/:id",
  authCheck,
  checkIsAdmin,
  uploadImageProduct,
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
