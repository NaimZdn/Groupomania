require('dotenv').config();
const { MongoClient } = require('mongodb');
const User = require('../models/user-model');
const Post = require('../models/post-model');
const fs = require('fs');

const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');
const cryptoJs = require('crypto-js')

const dbUrl = process.env.DB_URL;



const dbToken = process.env.DB_TOKEN;
const dbCryptoJs = process.env.DB_CRYPTOJS
const tokenExpiration = '24h';
const createToken = (id, isAdmin) => {
    return webToken.sign({ id, isAdmin }, dbToken, { expiresIn: '24h' })
}


exports.signup = (req, res, next) => {

    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, dbCryptoJs).toString();

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: emailCryptoJs,
                password: hash,
                picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/random-picture.png`,
                bio: "",
                isAdmin: false, 


            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur enregistré ! " }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {

    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, dbCryptoJs).toString();

    User.findOne({ email: emailCryptoJs })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: " Utilisateur introuvable " });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe invalide " });
                    }
                    const token = createToken(user._id, user.isAdmin);
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

exports.getOneUser = (req, res) => {

    User.findOne({ _id: req.params.id })
        .then(User => res.status(200).json(User))
        .catch(error => res.status(400).json({ message: 'Utilisateur introuvable' }));

}

exports.getAllUsers = (req, res) => {
    User.find()
        .then(User => res.status(200).json(User))
        .catch(error => res.status(400).json({ error }))
}


/*exports.updateProfil = (req, res) => {

    if (req.file) {
        User.findOne({ userId: req.params.id })
            .then((user) => {
                const filename = user.picture.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                });
            })
            .catch(error => res.status(404).json({ error }));
    };

    const updatedRecord = {
        bio: req.body.bio,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    };
    
    delete updatedRecord.userId
    User.updateOne({ userId: req.params.id }, { ...updatedRecord, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Le post a bien été modifié' }))
        .catch(error => res.status(400).json({ error }));

};*/

exports.deleteAccount = (req, res, next) => {

    const uri = dbUrl

    const client = new MongoClient(uri)

    try {
         client.connect(function deletePicture(err, client) {
            if (err) throw err;
            client.db("test").collection('posts').find({ userId: req.params.id }).toArray((err, result) => {
                if (err) throw err;
                for (res of result) {
                    const filename = res.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteMany({ userId: req.params.id })
                        .then(User.deleteOne({userId: req.params.id}))
                        .catch(() => console.log('Connexion à MongoDB échouée !'));
                    });
                } 
            })  

        }); 


      

    } catch (err) {
        return res.status(400).send(err);

    }


}



