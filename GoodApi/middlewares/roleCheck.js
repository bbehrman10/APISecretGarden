module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.userData.role === requiredRole) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};
