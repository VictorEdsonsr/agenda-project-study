const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const LoginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  confirmPassword: { type: String, require: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valid();

    try {
      //criando user no banco de dados
      this.user = await LoginModel.create(this.user);
    } catch (e) {
      throw new Error(e);
    }

    //checar se tem algum erro
    if (this.errors.length > 0) return;
  }

  valid() {
    this.cleanUp();

    //checar se email e valido
    if (!isEmail(this.body.email)) {
      this.errors.push("Email invalido");
    }

    //checar senha valida
    if (this.body.password.length < 8 || this.body.password.length > 12) {
      this.errors.push("A senha tem que ter entre 8 e 12 caracteres");
    }

    //checar se as senhas batem
    if (
      this.body.password !== this.body.confirmPassword ||
      this.body.confirmPassword !== this.body.password
    ) {
      this.errors.push("As senhas nao conferem");
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      confirmPassword: this.body.confirmPassword,
    };
  }
}

module.exports = Login;
