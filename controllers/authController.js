const User = require('../models/User'); // Importa el modelo de usuario
const bcrypt = require('bcryptjs'); // Importa el módulo bcryptjs para cifrar y comparar contraseñas
const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken para trabajar con tokens JWT
const { compareSync } = require('bcrypt'); // Importa la función compareSync de bcrypt

// Inicio de sesión de usuario
module.exports.login = (req, res) => { // Exporta la función login
    const username = req.body.username; // Obtiene el nombre de usuario del cuerpo de la solicitud
    const password = req.body.password; // Obtiene la contraseña del cuerpo de la solicitud

    if(username != null){ // Verifica si el nombre de usuario no es nulo
        User.findOne({ // Busca un usuario en la base de datos
            username : username // Criterio de búsqueda: nombre de usuario
        })
        .then((user) => { // Si encuentra un usuario
            if(user){

                const result = compareSync(password, user.password); // Compara la contraseña proporcionada con la almacenada
                if(result){
                    user.password = undefined; // Elimina la contraseña del objeto usuario
                    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { // Crea un token JWT con el usuario y una clave secreta
                    expiresIn: "24h" // Establece la duración del token en 24 horas
                    });
                    return res.status(200).json({ // Devuelve una respuesta exitosa con el token
                        status: "success",
                        data: {
                            user: user,
                            token: token,
                            message: "Authorized" // Mensaje de éxito
                        }
                    })
                }
                else
                {
                    return res.status(200).json({ // Devuelve una respuesta de fallo de autorización
                        status: "fail",
                        message: "Unauthorized" // Mensaje de fallo de autorización
                    })
                }
            }
            else{
                return res.status(400).json({ // Devuelve una respuesta de fallo si el usuario no se encuentra
                    status: "fail",
                    message: "Invalid username or password" // Mensaje de usuario o contraseña no válidos
                })
            }
        })
    }
}
