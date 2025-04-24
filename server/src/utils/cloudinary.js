const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

const uploadToCloudinary = (fileBuffer, folderName = "profiles") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folderName }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileWithFolder = parts.slice(-2).join("/");
  const [publicId] = fileWithFolder.split(".");
  return publicId;
};

const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error("Gagal menghapus gambar.");
  }
};

const isDummyImage = (url) => {
  return (
    url.includes("placehold.co") ||
    url.includes("placeholder.com") ||
    url.includes("dummyimage.com")
  );
};

module.exports = {
  uploadToCloudinary,
  getPublicIdFromUrl,
  deleteImageFromCloudinary,
  isDummyImage,
};
