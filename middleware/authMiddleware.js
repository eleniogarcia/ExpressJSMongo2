const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken para trabajar con tokens JWT
const User = require('../models/User'); 

const authMiddleware = (req, res, next) => { // Define el middleware de autenticación req solicitud
  const token = req.header('Auth'); // Obtiene el token del encabezado 'Auth'
  if (!token) { // Si no hay token
    return res.status(401).json({ 
      status: "fail",
      message: { body: "no tenes el token" }, 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Verifica el token utilizando una clave secreta(variable de entorno)
    if (err) { // Si el token no es válido
      return res.status(401).json({ // Devuelve un error 401 (No autorizado)
        status: "fail",
        message: { body: "token no valido" }, // Mensaje de error cuando el token no es válido
      });
    }

    User.findById(decoded.user._id).select('-password') // Busca al usuario por su ID excluyendo el campo 'password'
      .then((user) => { // Si encuentra al usuario lo guarda en la variable user
        if (!user) { 
          return res.status(401).json({ // Devuelve un error 401 (No autorizado)
            status: "fail",
            message: { body: "Usuario no encontrado" }, // Mensaje de error cuando el usuario no se encuentra
          });
        }
        req.user = user; // Agrega el usuario a la solicitud
        next(); // Continua con la siguiente función de middleware
      })
      .catch((error) => { // Si ocurre un error durante la búsqueda del usuario
        res.status(500).json({ // Devuelve un error 500 (Error interno del servidor)
          status: "fail",
          message: { body: "Error al verificar el token", details: error.message }, 
        });
      });
  });
};

module.exports = authMiddleware; 
