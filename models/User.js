const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir el esquema de Usuario
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware para encriptar la contraseña antes de guardarla en la base de datos
UserSchema.pre('save', async function (next) {
    try {
        // Si la contraseña no ha sido modificada, pasar al siguiente middleware
        if (!this.isModified('password')) return next();

        // Generar el salt
        const salt = await bcrypt.genSalt(10);

        // Hashear la contraseña usando el salt generado
        this.password = await bcrypt.hash(this.password, salt);

        // Pasar al siguiente middleware
        next();
    } catch (error) {
        next(error); // Manejar cualquier error
    }
});

// Método para comparar contraseñas (para la autenticación)
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Crear el modelo de Usuario
const User = mongoose.model('User', UserSchema);

// Exportar el modelo para usarlo en otros archivos
module.exports = User;
