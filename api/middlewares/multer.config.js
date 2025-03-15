const multer = require("multer");
// Almacenamiento en memoria para pruebas; para disco, configura destination y filename
const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports = upload;

