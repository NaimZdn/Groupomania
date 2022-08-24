const multer = require('multer');
const path = require('path'); 

const MIME_TYPES = {
  'image/jpg': 'webp',
  'image/jpeg': 'webp',
  'image/png': 'webp',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/uploads/posts');
  },

  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split('.' + extension).join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

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