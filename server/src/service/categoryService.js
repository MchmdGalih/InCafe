const { Categories } = require("../models");

const getAllCategories = async () => {
  const categories = await Categories.findAll({ attributes: ["id", "name"] });

  return categories;
};

const createCategoryByAdmin = async (body) => {
  const existingCategory = await Categories.findOne({
    where: { name: body.name },
  });

  if (existingCategory) {
    throw Error("Category already exists");
  }
  const newCategory = await Categories.create(body);

  return newCategory;
};

const getCategoryById = async (id) => {
  const category = await Categories.findByPk(id);

  if (!category) {
    throw Error("Category not found");
  }

  return category;
};

const updateCategoryByAdmin = async (id, { name }) => {
  const category = await getCategoryById(id);

  const payload = {
    name: name || category.name,
  };

  const updateCategory = await category.update(payload);

  return updateCategory;
};

const deleteCategoryById = async (id) => {
  const category = await getCategoryById(id);

  await category.destroy();
};

module.exports = {
  getAllCategories,
  createCategoryByAdmin,
  getCategoryById,
  updateCategoryByAdmin,
  deleteCategoryById,
};
