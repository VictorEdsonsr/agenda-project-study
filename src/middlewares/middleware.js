exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};

exports.checkCsrfError = (error, req, res, next) => {
  if (error) {
    res.render("404");
  }
};

exports.csrfGenerator = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
