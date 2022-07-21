const Profil = require('../models/profil-model')

exports.getProfilInformation = (req, res, next ) => {
    Profil.findOne({ _id: req.params.id})
}