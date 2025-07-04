const { Profile } = require("../models");
const {
  uploadToCloudinary,
  deleteImageFromCloudinary,
  getPublicIdFromUrl,
} = require("../utils/cloudinary");

const getProfileById = async (id) => {
  const profile = await Profile.findOne({
    where: { userId: id },
  });

  console.log('id service', id)

  if (!profile) {
    throw Error("Gagal mendapatkan profile, profile tidak ditemukan");
  }

  return profile;
};

const createOrUpdateService = async (id, validateMatched, file) => {
  let uploadImage = null;
  let newPublicId = null;

  if (file && file.size > 0) {
    const result = await uploadToCloudinary(file.buffer);
    uploadImage = result.secure_url;
    newPublicId = result.public_id;
  }

  const [profile, create] = await Profile.findOrCreate({
    where: { userId: id },
    defaults: {
      ...validateMatched,
      image: uploadImage,
    },
  });

  if (!create) {
    // Jika ada gambar baru dan gambar lama
    if (uploadImage && profile.image) {
      const oldPublicId = getPublicIdFromUrl(profile.image);
      await deleteImageFromCloudinary(oldPublicId);
    }

    await profile.update({
      firstName: validateMatched.firstName || profile.firstName,
      lastName: validateMatched.lastName || profile.lastName,
      phoneNumber: validateMatched.phoneNumber || profile.phoneNumber,
      image: uploadImage || profile.image,
    });
  }

  return { profile, create };
};

module.exports = { getProfileById, createOrUpdateService };
