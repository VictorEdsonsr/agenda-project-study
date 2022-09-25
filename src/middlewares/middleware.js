exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
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
