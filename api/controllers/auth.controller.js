/*
const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail } = require("../config/mailer.config");

module.exports.register = async (req, res, next) => {
    console.log("¡Qué demonios pasaaaaaaaaa!");
  try {
    const { email, userName, firstName, lastName, password, studies } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createError(400, {
          message: "User email already taken/El mail ya está siendo usado.",
          errors: { email: "Already exists/Ya existe" },
        })
      );
    }
    const user = await User.create({
      email,
      userName,
      firstName,
      lastName,
      password,
      studies: studies || "",
    });
    sendValidationEmail(user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
*/
const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail } = require("../config/mailer.config");
const jwt = require("jsonwebtoken");

// FUNCIÓN PARA REGISTRAR UN USUARIO:
module.exports.register = async (req, res, next) => {
  console.log("¡Qué demonios pasaaaaaaaaa!");
  try {
    const { email, userName, firstName, lastName, password, studies } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createError(400, {
          message: "User email already taken/El mail ya está siendo usado.",
          errors: { email: "Already exists/Ya existe" },
        })
      );
    }
    const user = await User.create({
      email,
      userName,
      firstName,
      lastName,
      password,
      studies: studies || "",
    });
    sendValidationEmail(user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA INICIAR SESIÓN (LOGIN):
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, "Credenciales incorrectas"));
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      return next(createError(401, "Credenciales incorrectas"));
    }
    // Genera un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

