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
const createToken = (id, isAdmin, pseudo) => {
    return webToken.sign({ id, isAdmin, pseudo }, dbToken, { expiresIn: '24h' })
}

exports.signup = (req, res, next) => {

    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, dbCryptoJs).toString();

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: emailCryptoJs,
                password: hash,
                picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/random-picture.webp`,
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
                    const token = createToken(user._id, user.isAdmin, user.pseudo);
                    res.cookie('webToken', token, { httpOnly: true, expiresIn: '24h' })

                    res.status(200).json({
                        userId: user._id,
                        pseudo: user.pseudo,
                        picture: user.picture
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
        .then(User => {
            const userInfos = {
                userId: User._id, 
                pseudo: User.pseudo, 
                picture: User.picture, 
                bio: User.bio, 
                isAdmin: User.isAdmin, 
                createdAt: User.createdAt, 
                
            }
            res.status(200).json({...userInfos})

        }
            )
        .catch(error => res.status(400).json({ message: 'Utilisateur introuvable' }));

}

exports.getAllUsers = (req, res) => {
    User.find()
        .then(User => res.status(200).json(User))
        .catch(error => res.status(400).json({ error }))
}


exports.updateProfil = (req, res) => {

    User.findOne({ _id: req.params.id })
        .then((user) => {
            const filename = user.picture.split('/images/uploads/profil/')[1];

            if (filename == "random-picture.webp" && req.file !== undefined) {
                console.log('test')
                console.log(req.file === undefined)
                console.log(req.file)
                
                const updatedRecord = {
                    bio: req.body.bio,
                    picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/${req.file.filename}`,
                };
              
                delete updatedRecord.id
                 User.updateOne({ _id: req.params.id }, { ...updatedRecord, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le profil a bien été modifié', ...updatedRecord }))
                    .catch(error => res.status(400).json({ error }));


            } else if (filename == "random-picture.webp" && req.file === undefined) {
                console.log('undefined + photo de base')
                console.log(req.body.bio)
                
                const updatedRecord = {
                    bio: req.body.bio,
                    picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/${filename}`,
                };
              
                delete updatedRecord.id
                 User.updateOne({ _id: req.params.id }, { ...updatedRecord, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le profil a bien été modifié', ...updatedRecord }))
                    .catch(error => res.status(400).json({ error }));
                    

            } else if (filename != 'random-picture.webp' && req.file != undefined){
                console.log('test2')
                fs.unlink(`images/uploads/profil/${filename}`, (error) => {
                    if (error) throw error;
                });
   
                const updatedRecord = {
                    bio: req.body.bio,
                    picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/${req.file.filename}`,
                };

                User.updateOne({ _id: req.params.id }, { ...updatedRecord, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le profil a bien été modifié', ...updatedRecord }))
                    .catch(error => res.status(400).json({ error }));

            } 
            else if (filename != 'random-picture.webp' && req.file === undefined){
                console.log('nouveau comportement')
   
                const updatedRecord = {
                    bio: req.body.bio,
                    picture: `${req.protocol}://${req.get('host')}/images/uploads/profil/${filename}`,
                };

                User.updateOne({ _id: req.params.id }, { ...updatedRecord, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le profil a bien été modifié', ...updatedRecord }))
                    .catch(error => res.status(400).json({ error }));

            } 
        })
        .catch(error => res.status(404).json({ error }));
};

exports.deleteAccount = (req, res, next) => {

    const uri = dbUrl;
    const client = new MongoClient(uri);

    try {

        client.connect(function deletePicture(err, client) {
            if (err) throw err;
            client.db("test").collection('posts').find({ userId: req.params.id }).toArray((err, result) => {

                if (err) throw err;

                for (res of result)  {
                    const filename = res.picture.split('/images/uploads/posts')[1];
                
                    fs.unlink(`images/uploads/posts/${filename}`, () => {
                        if (err) throw error;
                    });

                    Post.deleteMany({ userId: req.params.id })
                        .then()
                        .catch()
                };
            });
        });
        client.close();

        client.connect(function deleteUser(err, client) {
            if (err) throw err;
            client.db("test").collection('users').find().toArray((err, result) => {
                if (err) throw err;

                result.forEach(res => {
                    console.log(res)
                                   
                    const userId = res._id.valueOf();
                    const isAdmin = res.isAdmin;
                    const userPicture = res.picture.split('http://localhost:3000/images/uploads/profil/')[1];
                    console.log(userPicture)
                    const userIdFinal = userId === req.params.id; 
                    console.log('user final', userIdFinal)
                   
                

                    if (userId === req.params.id || isAdmin === true  ) {
                        //console.log('good');
                        //console.log(userId)
                        

                        if (userPicture === 'random-picture.webp') {
                            console.log('photo de profil basique');
                            //console.log({ _id: userId })
                          User.deleteOne({ _id: req.params.id })
                            .then()
                            .catch()

                            //console.log('delete')
                            
                        }else {
                            console.log('photo de profil modifiée');
                            fs.unlink(`./images/uploads/profil/${userPicture}`, ()=> {
                                if (err) throw error;
                            })
                            //console.log(userId)

                            User.deleteOne({ _id: req.params.id })
                            .then()
                            .catch()

                           // console.log('delete')        
                        };     
                    } else return console.log('non');
                });
            });
        });
        client.close(); 
        
        res.status(202).clearCookie('webToken').send({ message: 'Votre compte a bien été supprimé' })


    } catch (err) {
        return res.status(400).send(err);

    };
};



