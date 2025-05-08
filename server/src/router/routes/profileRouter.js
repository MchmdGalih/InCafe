const express = require("express");
const { authCheck } = require("../../middleware/auth");
const {
  getProfileHandler,
  createOrUpdateProfileHandler,
} = require("../../controllers/profileController");
const { validateProfile } = require("../../middleware/validation");
const { uploadImage } = require("../../middleware/uploadFile");

const profileRouter = express.Router();

profileRouter
  .route("/:id")
  .get(authCheck, getProfileHandler)
  .put(
    authCheck,
    uploadImage("image"),
    validateProfile,
    createOrUpdateProfileHandler
  );

module.exports = { profileRouter };
