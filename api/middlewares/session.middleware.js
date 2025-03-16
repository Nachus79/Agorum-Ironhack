/*
module.exports.isAuthenticated = (req, res, next) => {

    req.user = { id: "dummyUserId" };
    next();
  };
  
  module.exports.isAdmin = (req, res, next) => {
  
    next();
  };
  
  module.exports.isColaborator = (req, res, next) => {
    next();
  };
  */

  const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
 
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó token de autenticación" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    //PARA ASIGNAR EL ID DEL USUARIO (DEBERÍA ESTAR EN EL TOKEN)
    next();
  });
};

module.exports.isAdmin = (req, res, next) => {
  // Aquí puedes agregar la lógica para verificar si el usuario es administrador.
  next();
};

module.exports.isColaborator = (req, res, next) => {
  // Aquí puedes agregar la lógica para verificar si el usuario es colaborador.
  next();
};
