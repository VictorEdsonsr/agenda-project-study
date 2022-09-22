exports.initialPage = (req, res) => {
  res.render("index");
};

exports.postInitialPage = (req, res) => {
  console.log(req.body);

  res.send(`voce enviou ${req.body.cliente}`);
};
