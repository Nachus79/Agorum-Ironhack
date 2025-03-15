// Para propósitos de prueba, asignamos un usuario ficticio.
// En producción, implementa la verificación de tokens o sesiones.
module.exports.isAuthenticated = (req, res, next) => {
    // Aquí deberías validar el token o la sesión.
    // Por ahora, para pruebas, asignamos un usuario dummy:
    req.user = { id: "dummyUserId" };
    next();
  };
  
  module.exports.isAdmin = (req, res, next) => {
    // Implementa la lógica de administrador según tu aplicación.
    next();
  };
  
  module.exports.isColaborator = (req, res, next) => {
    next();
  };
  