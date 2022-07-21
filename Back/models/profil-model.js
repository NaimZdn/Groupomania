const mongoose = require('mongoose'); 

const profilSchema = mongoose.Schema ({
    pseudo: { type: String, required: true}, 
    profilPicture: { type: String}, 
    bio: {type: String}
});

module.exports = mongoose.model('Profil', profilSchema);