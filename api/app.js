require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error en la conexión a MongoDB:", err));

const cors = require("./config/cors.config");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const routes = require("./config/routes.config");

const app = express();

//MIDDLEWARES:
app.use(cors);
app.use(express.json());
app.use(morgan("dev"));

//CONFIGURACIÓN DE LAS ASESIONES:
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false },
  })
);

//MONTAJE DE LAS RUTAS (PROBAR EN ¡POSTMAAAAAAN!, NINONINONINO):
app.use("/api/v1", routes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  const createError = require("http-errors");
  next(createError(404, "Route not found/Ruta no encontrada"));
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = require("http-errors")(
      404,
      "Resource not found/Recurso no encontrado"
    );
  else if (error instanceof mongoose.Error.ValidationError)
    error = require("http-errors")(400, error);
  else if (!error.status) error = require("http-errors")(500, error.message);

  console.error(error);
  const data = { message: error.message };
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, key) => {
      errors[key] = error.errors[key]?.message || error.errors[key];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = app;
