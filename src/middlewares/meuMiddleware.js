exports.firstMiddleware = (req, res, next) => {
  if (req.body.cliente) {
    console.log(req.body.cliente);
  }

  next();
};

exports.checkCsrfError = (error, req, res, next) => {
  if (error && error.code === "EBADCSRFTOKEN") {
    res.render("404");
  }
};

exports.csrfGenerator = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
