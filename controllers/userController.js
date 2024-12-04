const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  User.find({}, 'username email name')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({
        status: "fail",
        message: { error: "Error al obtener usuarios", details: error.message },
      });
    });
};
const getOneUser = (req, res) => {
  const { id } = req.params; // Suponiendo que pasas el ID del usuario como parámetro en la URL.

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: { body: "User ID is required!" },
    });
  }

  User.findById(id, 'username email name') // Busca el usuario por ID y devuelve solo los campos seleccionados.
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: { body: "User not found!" },
        });
      }
      res.status(200).json({
        status: "success",
        message: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "fail",
        message: { body: "Error fetching user", details: error.message },
      });
    });
};


  const createUser = (req, res) => {
    if(req.body!=null && req.body!=undefined){
        if(req.body.username==null){
            res.status(400).json({
                status: "fail",
                message: { body: "el user se requiere!" }
              })
        }
        else if(req.body.password==null){
            res.status(400).json({
                status: "fail",
                message: { body: "la contrasena se requiere!" }
              })
        }
        else if(req.body.email==null){
            res.status(400).json({
                status: "fail",
                message: { body: "el mail se requiere!" }
              })
        }
        else{
            const user = new User({
                username: req.body.username,
                password: hashSync(req.body.password, genSaltSync(10)),
                email: req.body.email,
                name: req.body.name
            })

            user.save()
            .then((user) => {
                res.status(200).json({
                status: "success",
                message:  user })
            })
            .catch((err) => {
                res.status(500).json({
                    status : "fail",
                    message: err,
                })
            })

        }

    }
    else{
        res.status(400).json({
            status: "fail",
            message: { body: "el Body se requiere!" }
          })
    }
}
 



// Actualizar un usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const { email, username, name } = req.body;

  if (!id) {
    res.status(400).json({
      status: "fail",
      message: { body: "User ID is required!" },
    });
  } else if (!email && !username && !name) {
    res.status(400).json({
      status: "fail",
      message: { body: "At least one field (email, username, or name) is required!" },
    });
  } else {
    User.findByIdAndUpdate(
      id,
      { email, username, name },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({
            status: "fail",
            message: { body: "User not found!" },
          });
        } else {
          res.status(200).json({
            status: "success",
            message: user,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: "fail",
          message: { body: "Error updating user", details: error.message },
        });
      });
  }
};

// Eliminar un usuario
const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      status: "fail",
      message: { body: "User ID is required!" },
    });
  } else {
    User.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          res.status(404).json({
            status: "fail",
            message: { body: "User not found!" },
          });
        } else {
          res.status(200).json({
            status: "success",
            message: { body: "User deleted successfully!" },
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: "fail",
          message: { body: "Error deleting user", details: error.message },
        });
      });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
