const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
        var token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
    }
    return res.status(401).json({ message: 'No token, authorization denied' });
};
const isAdmin = (req, res, next) => {
    console.log("Here in isAdmin", req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }   
    return res.status(403).json({ message: 'Admin access required' });
};

module.exports = {verifyToken, isAdmin};