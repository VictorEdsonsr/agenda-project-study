const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  create: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async edit(id) {
    if (typeof id !== "string") return;

    this.validContact();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findOneAndUpdate(id, this.body, {
      new: true,
    });
  }

  static async delete(id) {
    if (typeof id !== "string") return;

    const contact = await ContactModel.findOneAndDelete({ _id: id });

    return contact;
  }

  static async buscaId(id) {
    if (typeof id !== "string") return;

    const contact = await ContactModel.findById(id);

    return contact;
  }

  static async buscaContatos() {
    const contact = await ContactModel.find().sort({ create: -1 });
    return contact;
  }

  async contactAdd() {
    this.validContact();

    //checar se tem algum erro
    if (this.errors.length > 0) return;

    //criando user no banco de dados
    this.contact = await ContactModel.create(this.body);
  }

  validContact() {
    this.cleanUp();

    //checar se email e valido
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("Email invalido");
    }

    //checar se tem email ou contato
    if (!this.body.email && !this.body.phone) {
      this.errors.push("Contato invalido: email ou telelfone");
    }

    //deve ter um nome
    if (!this.body.name) {
      this.errors.push("Identifique seu contato");
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      phone: this.body.phone,
    };
  }
}

module.exports = Contact;
