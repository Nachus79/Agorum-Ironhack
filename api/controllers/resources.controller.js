const createError = require("http-errors");
const Resource = require("../models/resource.model");

module.exports.create = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file ? req.file.path : null;
    if (!fileUrl) return next(createError(400, "Se requiere subir un archivo"));
    const resource = await Resource.create({
      title,
      description,
      fileUrl,
      addedBy: req.user ? req.user.id : null,
    });
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA ACTUALIZAR UN RECURSO:
module.exports.update = async (req, res, next) => {
  try {
    // CAMPOS DE LOS RECURSOS (REVISAR):
    const allowedUpdates = {
      title: req.body.title,
      description: req.body.description,
    };

    //ACTUALIZA EL FILEURL: 
    if (req.file) {
      allowedUpdates.fileUrl = req.file.path;
    }

    //ELIMINA LOS CAAMOS UNEDFINED:
    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!resource) {
      return next(createError(404, "Recurso no encontrado"));
    }
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA ELIMINAR UN RECURSO:
module.exports.delete = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return next(createError(404, "Recurso no encontrado"));
    }
    res.json({ message: "Recurso eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

