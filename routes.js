const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const userController = require("./src/controllers/userController");

//HOME
route.get("/", homeController.initialPage);
route.post("/", homeController.postInitialPage);

//USER
route.get("/user/register", userController.registerPageRender);
route.post("/user/register", userController.registerAccount);
route.get("/user/login", userController.login);

module.exports = route;
