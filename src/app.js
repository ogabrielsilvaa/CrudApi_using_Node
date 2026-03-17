const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const path = require("path");
require("dotenv").config(); //para pegar as variaveis de ambiente
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); //aqui estamos dizendo que o nome do diretorio é .env

const db = require("./database/models");
db.sequelize.authenticate()
  .then(() => console.log("DB conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar no DB: ", err));
  
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

//middleware que transforma a request em JSON
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/users', userRoutes);

//middleare de log
app.use(logger);
app.use("/auth", authRoutes);
// app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/users", userRoutes);
app.use(errorHandler);
app.use(notFound);

module.exports = app;
