const Contact = require("../models/ContactModel");

exports.addContactRender = (req, res) => {
  res.render("addContacts");
};

exports.addContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.contactAdd();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);

      req.session.save(() => {
        res.redirect("/contact/add");
      });
      return;
    }

    req.flash("success", "Contato adicionado com sucesso");

    req.session.save(() => {
      res.redirect(`/home`);
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.editContact = async (req, res) => {
  if (!req.params) return res.render("404");

  const contact = await Contact.buscaId(req.params.id);

  res.render("addContacts", { contact });
};
