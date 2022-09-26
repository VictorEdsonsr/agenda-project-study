const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async userLogin() {
    this.validLogin();

    //checar se tem algum erro
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Email nao existe.");
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha invalida.");
      this.user = null;
      return;
    }
  }

  async register() {
    this.validRegister();

    //checar se tem algum erro
    if (this.errors.length > 0) return;

    //usuario existe no banco
    await this.userExists();

    //checa denovo se tem erros
    if (this.errors.length > 0) return;

    const salt = bcrypt.genSaltSync();

    //criando user no banco de dados
    this.body.password = bcrypt.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push("Usuario ja existe");
  }

  validRegister() {
    this.cleanUp();

    //checar se email e valido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email invalido");
    }

    //checar senha valida
    if (this.body.password.length < 8 || this.body.password.length > 12) {
      this.errors.push("A senha tem que ter entre 8 e 12 caracteres");
    }

    //checar se as senhas batem
    if (this.body.confirmPassword !== this.body.password) {
      this.errors.push("As senhas nao conferem");
    }
  }

  validLogin() {
    this.cleanUp();

    //checar se email e valido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email invalido");
    }

    //checar senha valida
    if (this.body.password.length < 8 || this.body.password.length > 12) {
      this.errors.push("A senha tem que ter entre 8 e 12 caracteres");
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
