const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");

route.get("/", homeController.initialPage);
route.post("/", homeController.postInitialPage);

module.exports = route;
