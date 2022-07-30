const emailValidator = require('email-validator')

module.exports = (req, res, next) => {
    if(emailValidator.validate(req.body.email)) {
        next(); 

    } else {
        res.status(400).json({error : `Veuillez entrer une adresse mail valide `})
    }
}
