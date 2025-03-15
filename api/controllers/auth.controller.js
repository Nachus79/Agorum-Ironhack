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
