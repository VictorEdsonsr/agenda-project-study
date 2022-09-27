const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, default: "" },
  phone: { type: Number, required: false, default: "" },
  create: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async contactAdd() {
    this.validContact();

    //checar se tem algum erro
    if (this.errors.length > 0) return;

    //criando user no banco de dados
    this.contact = await ContactModel.create(this.body);
  }

  //   async userExists() {
  //     this.user = await LoginModel.findOne({ email: this.body.email });
  //     if (this.user) this.errors.push("Usuario ja existe");
  //   }

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
