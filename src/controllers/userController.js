exports.registerPageRender = (req, res) => {
  res.render("register");
};

exports.registerAccount = (req, res) => {
  res.send(req.body);
};

exports.login = (req, res) => {
  res.render("login");
};
