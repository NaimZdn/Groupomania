const express = require('express');
const router = express.Router(); 

const auth = require('../middlewares/auth'); 

const postCrtl = require ('../controllers/mainpage-controllers'); 

router.get('/', postCrtl.readPost); 
router.post('/', postCrtl.createPost);
router.put('/:id', postCrtl.updatePost); 
router.delete('/:id', postCrtl.deletePost); 

module.exports = router; 