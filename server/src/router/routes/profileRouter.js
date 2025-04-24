const express = require("express");
const { authCheck } = require("../../middleware/auth");
const {
  getProfileHandler,
  createOrUpdateProfileHandler,
} = require("../../controllers/profileController");
const { validateProfile } = require("../../middleware/validation");
const { uploadImageProfile } = require("../../middleware/uploadFile");

const profileRouter = express.Router();

profileRouter
  .route("/:id")
  .get(authCheck, getProfileHandler)
  .put(
    authCheck,
    uploadImageProfile,
    validateProfile,
    createOrUpdateProfileHandler
  );

module.exports = { profileRouter };
