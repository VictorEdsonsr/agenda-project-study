const ContactModel = require("../models/ContactModel");

exports.initialPage = async (req, res) => {
  const contact = await ContactModel.buscaContatos();
  res.render("index", { contact });
};

exports.welcomePage = (req, res) => {
  res.render("welcome");
};
