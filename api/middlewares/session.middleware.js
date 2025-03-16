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
    req.user = { id: decoded.id };
    next();
  });
};

module.exports.isAdmin = (req, res, next) => {
  //SI EL USUARIO ES ADMINISTRADOR (PARA CUANDO TENGA LOS ROLES)
  next();
};

module.exports.isColaborator = (req, res, next) => {
  //SI EL USUARIO ES COLABORADOR (ROLES)
  next();
};
