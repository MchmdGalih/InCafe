const express = require("express");
const { authRouter } = require("./routes/authRouter");
const { userRouter } = require("./routes/userRouter");
const { roleRouter } = require("./routes/roleRouter");
const { categoriesRouter } = require("./routes/categoryRoute");
const { profileRouter } = require("./routes/profileRouter");
const { productRouter } = require("./routes/productRouter");
const { orderRouter } = require("./routes/oderRouter");

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/role", roleRouter);
mainRouter.use("/category", categoriesRouter);
mainRouter.use("/profile", profileRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/order", orderRouter);

module.exports = mainRouter;
