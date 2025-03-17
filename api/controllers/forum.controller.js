const createError = require("http-errors");
const Post = require("../models/post.model");

//¿POLÍTICA DE COMPORTAMIENTO?
//PARA CREAR UN POST:
module.exports.create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      author: req.user ? req.user.id : null,
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

//LISTSR LOS POSTS:
module.exports.list = async (req, res, next) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "userName firstName lastName"
    );
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

//MOSTRAR POR ID
module.exports.getDetails = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "userName firstName lastName"
    );
    if (!post) return next(createError(404, "Post no encontrado"));
    res.json(post);
  } catch (error) {
    next(error);
  }
};

//ACTUALIZAR POSTS:
module.exports.update = async (req, res, next) => {
  try {
    const allowedUpdates = {
      title: req.body.title,
      content: req.body.content,
    };

    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!post) {
      return next(createError(404, "Post no encontrado"));
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};
// FUNCIÓN PARA AGREGAR UN COMENTARIO A UN POST:
module.exports.addComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { text } = req.body;
      const comment = {
        text,
        author: req.user.id,
      };
  
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true, runValidators: true }
      ).populate("comments.author", "userName firstName lastName");
  
      if (!post) {
        return next(createError(404, "Post no encontrado"));
      }
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };
  
//BORRAR MENSAJE:
module.exports.delete = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return next(createError(404, "Post no encontrado"));
    }
    res.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
