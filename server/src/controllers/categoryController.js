const {
  getAllCategories,
  createCategoryByAdmin,
  getCategoryById,
  deleteCategoryById,
  updateCategoryByAdmin,
} = require("../service/categoryService");

const getAllCategoriesHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const createCategoryHandler = async (req, res) => {
  try {
    const newCategory = await createCategoryByAdmin(req.body);
    return res.status(201).json({
      message: "Category create successfuly",
      data: {
        category: newCategory,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const getCategoryByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    return res.status(200).json({
      message: `Category dengan id: ${id} ditemukan`,
      data: category,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const editCategory = await updateCategoryByAdmin(id, req.body);
    return res.status(200).json({
      message: `Category dengan id: ${id} berhasil diupdate`,
      data: editCategory,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategoryById(id);
    return res
      .status(200)
      .json({ message: `Category dengan id: ${id} berhasil dihapus` });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something wrong", error: error.message });
  }
};

module.exports = {
  getAllCategoriesHandler,
  createCategoryHandler,
  getCategoryByIdHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
};
