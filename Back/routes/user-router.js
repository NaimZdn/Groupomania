const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/user-controllers');

router.post('/login', userCtrl.login); 
router.post('/signup', userCtrl.signup);
router.get('/logout', userCtrl.logout); 
router.delete('/:id/delete', userCtrl.deleteAccount)

module.exports = router; 