// Importation de multer qui nous permet d'enregistrer les images que les utilisateurs vont upload dans sur notre application
const multer = require('multer');

// Création des extensions des fichiers.
const MIME_TYPES = {
  'image/jpg': 'webp',
  'image/jpeg': 'webp',
  'image/png': 'webp'
};

// On dit un multer que l'on va enregister les images sur notre disque, ici ce sera le dossier images.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/uploads/profil');
  },
  // On dit a multer quel nom de fichier utiliser. On enlever les espaces en les remplaçant par des underscore.
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split('.' + extension).join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

// On exporte l'objet storage.
module.exports = multer({storage: storage}).single('image');