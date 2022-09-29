const Login = require("../models/LoginModel");

exports.registerPageRender = (req, res) => {
  res.render("register");
};

//register account de user
exports.registerAccount = async (req, res) => {
  try {
    const register = new Login(req.body);
    await register.register();

    if (register.errors.length > 0) {
      req.flash("errors", login.errors);

      req.session.save(() => {
        res.redirect("/user/register");
      });

      return;
    }

    req.flash("success", "Voce foi cadastrado com sucesso");

    req.session.save(() => {
      res.redirect("/user/login");
    });
  } catch (e) {
    res.render("404");
    console.log(e);
  }
};

exports.login = (req, res) => {
  res.render("login");
};

//logando user
exports.loginUser = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.userLogin();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);

      req.session.save(() => {
        res.redirect("/user/login");
      });

      return;
    }

    req.flash("success", "Voce logou com sucesso.");
    req.session.user = login.user;
    req.session.save(() => {
      res.redirect("/home");
    });
  } catch (e) {
    res.render("404");
    console.log(e);
  }
};

exports.login = (req, res) => {
  res.render("login");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
