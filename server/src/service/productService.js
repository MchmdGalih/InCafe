const { Product, Categories } = require("../models");
const {
  uploadToCloudinary,
  getPublicIdFromUrl,
  deleteImageFromCloudinary,
} = require("../utils/cloudinary");

const createProduct = async (body, file) => {
  const images = file?.image_cover;

  const imageUploadResult = await Promise.all(
    images.map((file) => uploadToCloudinary(file.buffer, "imageProducts"))
  );

  const imagesUrl = imageUploadResult.map((result) => result.secure_url);

  const category = await Categories.findOne({
    where: {
      name: body.categoryId,
    },
  });

  const payload = {
    name: body.name,
    categoryId: category.id,
    image_cover: imagesUrl,
    description: body.description,
    price: body.price,
    stock: body.stock,
  };

  const [product, create] = await Product.findOrCreate({
    where: { name: body.name },
    defaults: {
      ...payload,
    },
  });

  if (create) {
    return product;
  } else {
    throw Error("Product already exists");
  }
};

const getAllProducts = async (whereCondition) => {
  const products = await Product.findAll({
    where: whereCondition,
    include: {
      model: Categories,
      attributes: ["id", "name"],
    },
  });

  return products;
};

const getProductById = async (productId) => {
  const product = await Product.findOne({
    where: {
      id: productId,
    },
    include: {
      model: Categories,
      attributes: ["id", "name"],
    },
  });

  if (!product) {
    throw Error("Product tidak ditemukan ");
  }

  return product;
};

const updateProduct = async (id, body, file) => {
  const product = await getProductById(id);
  const category = await Categories.findOne({
    where: {
      name: body.categoryId,
    },
  });

  if (!category) {
    throw new Error("Category dengan nama tersebut tidak ditemukan.");
  }

  let uploadImage = null;
  let newPublicId = null;

  if (file && file.size > 0) {
    const result = await uploadToCloudinary(file.buffer, "imageProducts");
    uploadImage = result.secure_url;
    newPublicId = result.public_id;
  }

  if (uploadImage && product.image_cover) {
    const oldPublicId = getPublicIdFromUrl(product.image_cover);
    await deleteImageFromCloudinary(oldPublicId);
  }

  const payload = {
    name: body.name || product.name,
    description: body.description || product.description,
    price: body.price || product.price,
    stock: body.stock || product.stock,
    categoryId: category.id || product.categoryId,
    image_cover: uploadImage || product.image_cover,
  };

  console.log(payload);
  const updateProduct = await product.update(payload);

  return updateProduct;
};

const deleteProduct = async (productId) => {
  const product = await getProductById(productId);

  const productImage = product.image_cover;

  if (productImage) {
    const publicId = getPublicIdFromUrl(productImage);
    await deleteImageFromCloudinary(publicId);
  }

  await product.destroy();
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
