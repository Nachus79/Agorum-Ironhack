const createError = require("http-errors");
const Event = require("../models/event.model");

// FUNCIÓN PARA CREAR UN EVENTO:
module.exports.create = async (req, res, next) => {
  try {
    const { title, description, date, location, link } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      location,
      link, 
      organizer: req.user ? req.user.id : null,
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA LISTAR LOS EVENTOS:
module.exports.list = async (req, res, next) => {
  try {
    const events = await Event.find().populate(
      "organizer",
      "userName firstName lastName"
    );
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA ACTUALIZAR UN EVENTO:
module.exports.update = async (req, res, next) => {
  try {
    //CAMPOS QUE SE PUEDEN ACTUALIZAR (REVISAR;
    const allowedUpdates = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      link: req.body.link,
    };

    //QUITA LOS CAMPOS UNDEFINED:
    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    //BUSCA Y ACUTALIZA EL EVENTO:
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!event) {
      return next(createError(404, "Evento no encontrado"));
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

//FUNCIÓN PARA ELIMINAR UN EVENTO:
module.exports.delete = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return next(createError(404, "Evento no encontrado"));
    }
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
