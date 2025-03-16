const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail } = require("../config/mailer.config");

// FUNCIÓN PARA CREAR UN USUARIO:
module.exports.create = async (req, res, next) => {
  try {
    const { email, userName, firstName, lastName, password, studies } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createError(400, {
          message: "El email ya está siendo usado.",
          errors: { email: "Already exists" },
        })
      );
    }
    const user = await User.create({
      email,
      userName,
      firstName,
      lastName,
      password,
      studies: studies || "", //¿NECESARIO?
    });
    sendValidationEmail(user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA ACTUALIZAR EL PERFIL DEL USUARIO:
module.exports.update = async (req, res, next) => {
  if (!req.user) {
    return next(createError(401, "Usuario no autenticado"));
  }
  try {
    //CAMPOS QUE SE PUEDEN ACTUALIZAR.
    const allowedUpdates = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studies: req.body.studies,
    };

    
    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    // ACTUALIZACIÓN DEL USUARIO EN LA BASE DE DATOS.
    const user = await User.findByIdAndUpdate(req.user.id, { $set: allowedUpdates }, { new: true, runValidators: true });
    if (!user) {
      return next(createError(404, "Usuario no encontrado"));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA OBTENER EL PERFIL DEL USUARIO:
module.exports.profile = async (req, res, next) => {
  if (!req.user) {
    return next(createError(401, "Usuario no autenticado"));
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "Usuario no encontrado"));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA VALIDAR UN USUARIO (TOKEN, REVISAR):
module.exports.validate = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.query;
  if (!id || !token) {
    return next(createError(400, "Faltan datos para la validación"));
  }
  try {
    const user = await User.findOne({ _id: id, activateToken: token });
    if (!user) {
      return next(createError(404, "Usuario no encontrado"));
    }
    user.active = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA ELIMINAR UN USUARIO:
module.exports.delete = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(404, "Usuario no encontrado"));
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};



