const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const userController = require("./src/controllers/userController");
const contactControler = require("./src/controllers/contactControler");

//HOME
route.get("/", homeController.welcomePage);

//welcomePage
route.get("/home", homeController.initialPage);

//USER
route.get("/user/register", userController.registerPageRender);
route.post("/user/register", userController.registerAccount);
route.get("/user/login", userController.login);
route.post("/user/login", userController.loginUser);
route.get("/user/logout", userController.logout);

//CRUD

//CREATE
route.get("/contact/index", contactControler.addContactRender);
route.post("/contact/add", contactControler.addContact);
route.get("/contact/index/:id", contactControler.editContact);
route.post("/contact/edit/:id", contactControler.edit);
route.get("/contact/delete/:id", contactControler.delete);

module.exports = route;
