require('dotenv').config();
const webToken = require ('jsonwebtoken');
const User = require ('../models/user-model');
const Post = require ('../models/post-model');

const dbToken = process.env.DB_TOKEN;

module.exports =  (req, res, next) => {
    User.findOne().select('isAdmin')
    .then(user => {
        const userTest = user
        const admin = user.isAdmin
        console.log(admin)
        const token = req.cookies.webToken; 
        //console.log(token)
        const decodedToken = webToken.verify(token, dbToken);
        const userId = decodedToken.id;
        //console.log(user.id)
        console.log(userId)
        console.log(userTest)
        //console.log(!admin || userTest && userTest !== userId)
        //console.log(!admin || userTest === userId)
        //console.log(admin || userTest && userTest !== userId)
        if ( !admin || userTest && userTest !== userId  ) {
            res.status(403).json({ message: 'Requête non autorisée' });
        } else if (admin || userTest && userTest !== userId) {
            next();
        } else if (!admin || userTest === userId) {
            next(); 
        }
    }) .catch (error =>  {
        res.status(401).json({ error: error | 'Requête non authentifiée ! '})
    });
        
   
    
};