const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No se encontró el token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token.split(' ')[1], process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};
