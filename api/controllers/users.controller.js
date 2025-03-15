const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail } = require("../config/mailer.config");

//FUNCIÓN PARA CREAR UN USUARIO (REVISAR):
module.exports.create = (req, res, next) => {
  const { email, userName, firstName, lastName, password, studies } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(
          createError(400, {
            message: "El email ya está siendo usado.",
            errors: { email: "Already exists" },
          })
        );
      } else {
        return User.create({
          email,
          userName,
          firstName,
          lastName,
          password,
          studies: studies || "", //SE PUEDE QUEDAR VACÍO (POR SI EL USUARIO NO DESEA DAR ESA INFORMACIÓN).
        }).then((user) => {
          sendValidationEmail(user);
          res.status(201).json(user);
        });
      }
    })
    .catch((error) => next(error));
};

//ACTUALIZACIÓN DEL PERFIL DE USUARIO. 
module.exports.update = (req, res, next) => {
  if (!req.user) {
    return next(createError(401, "Usuario no autenticado"));
  }

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

  Object.assign(req.user, allowedUpdates);

  req.user
    .save()
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => next(error));
};

//OBTENER PERFIL DE USUARIO: 
module.exports.profile = (req, res, next) => {
  if (!req.user) {
    return next(createError(401, "Usuario no autenticado"));
  }
  res.json(req.user);
};

//VALIDACIÓN DE UN USUARIO (TOKEN, REVISAR):
module.exports.validate = (req, res, next) => {
  const { id } = req.params;
  const { token } = req.query;

  if (!id || !token) {
    return next(createError(400, "Faltan datos para la validación"));
  }

  User.findOne({ _id: id, activateToken: token })
    .then((user) => {
      if (!user) {
        return next(createError(404, "Usuario no encontrado"));
      }
      user.active = true;
      return user.save();
    })
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

//FUNCIÓN PARA ELIMINAR UN USUARIO:
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


