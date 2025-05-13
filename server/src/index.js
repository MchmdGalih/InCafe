require("dotenv").config();
const express = require("express");
const mainRouter = require("./router/main");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

module.exports = app;
