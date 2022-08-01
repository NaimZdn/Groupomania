const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/user-controllers');
const auth = require('../middlewares/auth'); 
const multerUser = require('../middlewares/multer-configUser'); 
const passwordValidator = require('../middlewares/password-validator');
const emailValidator = require('../middlewares/email-validator');
const idCompareUser = require('../middlewares/idCompareUser'); 


router.post('/login', emailValidator, userCtrl.login); 
router.post('/signup', emailValidator, passwordValidator, userCtrl.signup);
router.get('/logout', auth, userCtrl.logout); 



router.get('/user/:id', auth, userCtrl.getOneUser);
router.get('/users',  auth, userCtrl.getAllUsers);
router.put('/user/:id', idCompareUser, multerUser, userCtrl.updateProfil);
router.delete('/:id/delete', userCtrl.deleteAccount);


module.exports = router; 