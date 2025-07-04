const { matchedData } = require("express-validator");

const {
  getProfileById,
  createOrUpdateService,
} = require("../service/profileService");

const getProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id controller", id);
    const profile = await getProfileById(id);
    return res
      .status(200)
      .json({ message: "Profile berhasil ditemukan", data: profile });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something wrong", error: error.message });
  }
};

const createOrUpdateProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedMatched = matchedData(req);
    const file = req?.file;

    const { profile, create } = await createOrUpdateService(
      id,
      validatedMatched,
      file
    );
    const message = create
      ? "Profile berhasil dibuat"
      : "Profile berhasil diperbarui";

    return res.status(200).json({ message: message, data: profile });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

module.exports = { getProfileHandler, createOrUpdateProfileHandler };
