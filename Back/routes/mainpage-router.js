const express = require('express');
const router = express.Router(); 
const multer = require('../middlewares/multer-config'); 

const auth = require('../middlewares/auth'); 
const idCompare = require('../middlewares/idCompare');
const isAdmin = require('../middlewares/admin'); 
const isAdmin2 = require('../middlewares/admin2'); 

const postCrtl = require ('../controllers/mainpage-controllers'); 

router.get('/', auth, postCrtl.readPost); 
router.get('/:id', auth, postCrtl.getUsersPosts);
router.post('/', auth, multer, postCrtl.createPost);
router.put('/:id', auth, idCompare, multer, postCrtl.updatePost); 
router.delete('/:id', auth, idCompare, multer, postCrtl.deletePost); 
router.post('/:id/like', auth, postCrtl.likePost); 

// comments
router.patch('/comment/:id', auth, postCrtl.addComment); 
router.patch('/edit-comment/:id', auth, idCompare, postCrtl.editComment); 
router.patch('/delete-comment/:id', auth, idCompare, postCrtl.deleteComment); 

module.exports = router; 