const User = require('../models/user-model');
const Post = require('../models/post-model');
const fs = require('fs');

const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');


const dbToken = process.env.DB_TOKEN;
const tokenExpiration = '24h';
const createToken = (id) => {
    return webToken.sign({ id }, dbToken, { expiresIn: '24h' })
}


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/random-picture.png`,
                bio: "",

            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur enregistré ! " }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: " Utilisateur introuvable " });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe invalide " });
                    }
                    const token = createToken(user._id);
                    res.cookie('webToken', token, { httpOnly: true, expiresIn: '24h' })
                    res.status(200).json({
                        userId: user._id,
                        pseudo: user.pseudo,
                    });

                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
    res.status(202).clearCookie('webToken').send({ message: 'Vous avez bien été deconnecté' })
}

exports.deleteAccount = async (req, res) => {

    await Post.find({ userId: req.params.id })
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(400).json({ error }));


}

