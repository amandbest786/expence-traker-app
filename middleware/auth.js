const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    try {
        let token = req.header('Authorization').split(" ")[1];

        if(!token){
            return res.status(401).json({ message: "No token" });
        }

        const decoded = jwt.verify(token, "mySecretKey");

        req.userId = decoded.userId;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized", err });
    }
};