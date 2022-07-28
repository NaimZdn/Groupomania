require('dotenv').config();
const webToken = require ('jsonwebtoken');
const Post = require ('../models/post-model');

const dbToken = process.env.DB_TOKEN;

module.exports = (req, res, next) => {
    Post.findOne({ _id: req.params.id}) 
        .then (post => {
        const token = req.cookies.webToken; 
        const decodedToken = webToken.verify(token, dbToken);
        const userId = decodedToken.id;
        console.log(post.userId)
        console.log(decodedToken.id)
        if (post.userId && post.userId !== userId) {
            res.status(403).json({ message: 'Requête non autorisée' });
        } else {
            next();
        }
    }) .catch (error =>  {
        res.status(401).json({ error: error | 'Requête non authentifiée ! '})
    });
};