// Importation de multer qui nous permet d'enregistrer les images que les utilisateurs vont upload dans sur notre application
const multer = require('multer');
const path = require('path'); 

// Création des extensions des fichiers.
const MIME_TYPES = {
  'image/jpg': 'webp',
  'image/jpeg': 'webp',
  'image/png': 'webp',
  'image/webp': 'webp',
};

// On dit un multer que l'on va enregister les images sur notre disque, ici ce sera le dossier images.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/uploads/posts');
  },
  // On dit a multer quel nom de fichier utiliser. On enlever les espaces en les remplaçant par des underscore.
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split('.' + extension).join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

// On exporte l'objet storage.
module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let mimetype = path.extname(file.originalname);
    if (mimetype !== '.png' && mimetype !== '.jpg' && mimetype !== '.svg' && mimetype !== '.jpeg' && mimetype !== '.webp') {
      return callback(new Error(`Seulement les images au format .PNG, .JPEG, .JPG, .SVG et .WEBP sont autorisées`))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }

}).single('image');