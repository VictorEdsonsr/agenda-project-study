const session = require("express-session");
const Login = require("../models/LoginModel");

exports.registerPageRender = (req, res) => {
  res.render("register");
};

exports.registerAccount = async (req, res) => {
  const login = new Login(req.body);

  await login.register();

  if (login.errors.length > 0) {
    req.flash("erros", login.errors);

    session.save(() => {
      return res.redirect("back");
    });
    return;
  }
  res.send(login.errors);
};

exports.login = (req, res) => {
  res.render("login");
};
