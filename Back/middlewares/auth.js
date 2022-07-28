const webToken = require ('jsonwebtoken');

const dbToken = process.env.DB_TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.webToken; 
        const decodedToken = webToken.verify(token, dbToken);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            console.log(userId)
            throw 'User ID non valable !'; 
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Requête non authentifiée ! '});
    }
};