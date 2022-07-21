const express = require('express'); 
const router = express.Router(); 

const auth = require('../middlewares/auth'); 

const modelCtrl = require('../controllers/profil-controllers'); 



router.get('/:id', auth,  ); 

module.exports = router; 