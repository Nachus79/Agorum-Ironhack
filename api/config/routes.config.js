const express = require("express");
const router = express.Router();
const createError = require("http-errors");

// CONTROLADORES BÁSICOS (REVISAR):
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const newsController = require("../controllers/news.controller");
const eventsController = require("../controllers/events.controller");
const forumController = require("../controllers/forum.controller");
const resourcesController = require("../controllers/resources.controller");

// MIDDLEWARES:
const auth = require("../middlewares/session.middleware");

// AUTENTICACIÓN, REGISTRO, LOGAUT Y DEMÁS:
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// ------------(AGREGAR RUTAS PARA EL RESTO)------------------------------

// RUTAS DE USUARIOS: (¿DEBERÍA INCLUIR UN PUT?)
router.post("/users", usersController.create);
router.patch("/users/me", auth.isAuthenticated, usersController.update);
router.get("/users/me", auth.isAuthenticated, usersController.profile);
router.get("/users/:id/validate", auth.isAuthenticated, auth.isAdmin, usersController.validate);
// SOLAMENTE UN ADMINISTRADOR AUTENTICADO PUEDE BORRAR USUARIOS:
router.delete("/users/:id", auth.isAuthenticated, auth.isAdmin, usersController.delete);

// NOTICIAS:
router.post("/news", auth.isAuthenticated, newsController.create);
router.patch("/news/:id", auth.isAuthenticated, auth.isAdmin, newsController.update);
router.get("/news", newsController.list);
// SOLAMENTE UN ADMINISTRADOR AUTENTICADO PUEDE BORRAR NOTICIAS:
router.delete("/news/:id", auth.isAuthenticated, auth.isAdmin, newsController.delete);

// EVENTOS:
router.post("/events", auth.isAuthenticated, eventsController.create);
// Aquí se corrige: usar eventsController.update en lugar de newsController.update
router.patch("/events/:id", auth.isAuthenticated, auth.isAdmin, eventsController.update);
router.get("/events", eventsController.list);
router.get("/events/:id", eventsController.getDetails);
// SOLAMENTE UN ADMINISTRADOR AUTENTICADO PUEDE BORRAR EVENTOS:
router.delete("/events/:id", auth.isAuthenticated, auth.isAdmin, eventsController.delete);

// RUTAS DEL FORO:
router.post("/forum", auth.isAuthenticated, forumController.create);
router.get("/forum", forumController.list);
router.get("/forum/:id", forumController.getDetails);
router.patch("/forum/:id", auth.isAuthenticated, forumController.update);
router.delete("/forum/:id", auth.isAuthenticated, auth.isAdmin, forumController.delete);
router.post("/forum/:postId/comments", auth.isAuthenticated, forumController.addComment);


// RECURSOS (CON SUBIDA DE ARCHIVOS):
const upload = require("../middlewares/multer.config");
router.post("/resources", auth.isAuthenticated, upload.single("file"), resourcesController.create);
// ELIMINACIÓN DE RECURSOS (SOLAMENTE PARA ADMINISTRADORES):
router.delete("/resources/:id", auth.isAuthenticated, auth.isAdmin, resourcesController.delete);

// RUTAS NO ENCONTRADAS:
router.use((req, res, next) => {
  next(createError(404, "Route not found/Ruta no encontrada"));
});

// ERRORES DEL SERVIDOR:
router.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message });
});

module.exports = router;

