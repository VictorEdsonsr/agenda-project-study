const Login = require("../models/LoginModel");

exports.registerPageRender = (req, res) => {
  res.render("register");
};

exports.registerAccount = async (req, res) => {
  const login = new Login(req.body);

  await login.register();

  if (login.errors.length > 0) {
    req.flash("erros", login.errors);

    req.session.save(function () {
      return res.redirect("/user/register");
    });
    return;
  }
  res.send(login.errors);
};

exports.login = (req, res) => {
  res.render("login");
};
