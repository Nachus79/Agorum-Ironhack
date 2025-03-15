const createError = require("http-errors");
const News = require("../models/news.model");

// FUNCIÓN PARA CREAR UNA NOTICIA:
module.exports.create = async (req, res, next) => {
  try {
    const { title, description, category, link } = req.body;
    const news = await News.create({
      title,
      description,
      category,
      link,
      author: req.user ? req.user.id : null,
    });
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA LISTAR LAS NOTICIAS:
module.exports.list = async (req, res, next) => {
  try {
    const news = await News.find().populate("author", "userName firstName lastName");
    res.json(news);
  } catch (error) {
    next(error);
  }
};

// FUNCIÓN PARA ACTUALIZAR UNA NOTICIA:
module.exports.update = async (req, res, next) => {
  try {
    //¿NECESITARÉ MÁS CAMPOS?:
    const allowedUpdates = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      link: req.body.link,
    };

    //SI UN CAMPO ES "UNDEFINED" SE ELIMINA:
    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    //PARA BUSCAR Y ASTUALIZARR LA NOTICIA:
    const newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!newsItem) {
      return next(createError(404, "Noticia no encontrada"));
    }

    res.json(newsItem);
  } catch (error) {
    next(error);
  }
};

//FUNCIÓN PARA ELIMINAR UNA NOTICIA:
module.exports.delete = async (req, res, next) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      return next(createError(404, "Noticia no encontrada"));
    }
    res.json({ message: "Noticia eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

