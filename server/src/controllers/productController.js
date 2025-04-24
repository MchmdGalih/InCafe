const { matchedData } = require("express-validator");

const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../service/productService");
const { Products, Categories } = require("../models");
const {
  uploadToCloudinary,
  isDummyImage,
  getPublicIdFromUrl,
  deleteImageFromCloudinary,
} = require("../utils/cloudinary");

const createProductHandler = async (req, res) => {
  try {
    const files = req?.files;

    const validatedMatched = matchedData(req);
    const newProduct = await createProduct(validatedMatched, files);

    return res.status(200).json({
      message: "Product created successfully",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something Wrong server",
      error: error.message,
    });
  }
};

const getAllProductHandler = async (req, res) => {
  try {
    const { category } = req.query;
    const whereCondition = {};

    if (category) {
      whereCondition.categoryId = category;
    }
    const products = await getAllProducts(whereCondition);
    return res.status(200).json({
      message: "Successfuly",
      data: products,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something Wrong server",
      error: error.message,
    });
  }
};

const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    return res.status(200).json({
      message: "Product ditemukan",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something Wrong server",
      error: error.message,
    });
  }
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const validatedMatched = matchedData(req);
    const { replaceIndex } = req.body;
    const files = req?.files;

    const product = await updateProduct(
      id,
      validatedMatched,
      files,
      replaceIndex
    );

    const productData = {
      ...product.toJSON(),
      image_cover: JSON.parse(product.image_cover),
    };
    return res.status(201).json({
      message: "Product berhasil diperbarui",
      data: productData,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something Wrong server",
      error: error.message,
    });
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);

    return res.status(200).json({
      message: "Product berhasil dihapus",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
};
