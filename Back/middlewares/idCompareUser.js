require('dotenv').config();
const webToken = require('jsonwebtoken');
const { Admin } = require('mongodb');
const User = require('../models/user-model');

const dbToken = process.env.DB_TOKEN;

module.exports = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            const token = req.cookies.webToken;
            const decodedToken = webToken.verify(token, dbToken);
            const userId = decodedToken.id;
            const isAdmin = decodedToken.isAdmin;
            if (isAdmin === false && user.id !== userId) {
                res.status(403).json({ message: 'Requête non autorisée' });
            } else if (isAdmin === true && user.id !== userId) {
                next();
            } else if (isAdmin === true && user.id === userId) {
                next();
            }else if (isAdmin === false && user.id === userId) {
                next();
            }
        }).catch(error => {
            res.status(401).json({ error: error | 'Requête non authentifiée ! ' })
        });
};