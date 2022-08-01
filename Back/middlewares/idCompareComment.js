require('dotenv').config();
const webToken = require('jsonwebtoken');
const Post = require('../models/post-model');

const dbToken = process.env.DB_TOKEN;

module.exports = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const token = req.cookies.webToken;
            const decodedToken = webToken.verify(token, dbToken);
            const userId = decodedToken.id;
            const isAdmin = decodedToken.isAdmin;
            const comments = post.comments.find(comment => comment.userId);
            const commentUserId = comments.userId
            console.log(commentUserId)
            console.log(isAdmin)

            if (isAdmin === false && commentUserId !== userId) {
                res.status(403).json({ message: 'Requête non autorisée' });
            } else if (isAdmin === true && commentUserId !== userId) {
                next();
            } else if (isAdmin === true && commentUserId === userId) {
                next();
            }else if (isAdmin === false && commentUserId === userId) {
                next();
            }
        }).catch(error => {
            res.status(401).json({ error: error | 'Requête non authentifiée ! ' })
        });
};
