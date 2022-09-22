// variaveis ambiente
require("dotenv").config();

//inicializando o express
const express = require("express");
const app = express();

//diretorios absolutos
const path = require("path");

//inicializando e conectando mongoDB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => {
    throw new Error(e);
  });

//dependencias de sessoes
//seguranca(helmet, csurf)
//inicializar sessoes(connect-mongo)
//mensagens temporarias(connect-flash)
const session = require("express-session");
const helmet = require("helmet");
const csrf = require("csurf");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

//rotas da aplicacao
const routes = require("./routes");

//middlewares
const {
  firstMiddleware,
  checkCsrfError,
  csrfGenerator,
} = require("./src/middlewares/meuMiddleware");

//usando a seguranca do helmet
app.use(helmet());

//permitindo a postagens de dados no body
app.use(express.urlencoded({ extended: true }));

//conversao de json caso precise
app.use(express.json());

//arquivos estaticos
app.use(express.static(path.resolve(__dirname, "public")));

//configurando sessoes
const sessionOption = session({
  secret: "secret key",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitia: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

//usando sessoes e flash-messages
app.use(sessionOption);
app.use(flash());

//configurando view
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

//usando csurf para nao permitir postagens de sites maliciosos para o nosso
app.use(csrf());

//usando os middlewares globais
app.use(firstMiddleware);
app.use(checkCsrfError);
app.use(csrfGenerator);

//usando as rotas
app.use(routes);

//esperando conexao com o mongo para escutar a porta 3000
app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("acesse http://localhost:3000");
  });
});
