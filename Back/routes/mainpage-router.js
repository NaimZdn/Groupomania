const express = require('express');
const router = express.Router(); 
const multer = require('../middlewares/multer-configPost'); 

const auth = require('../middlewares/auth'); 
const idComparePost = require('../middlewares/idComparePost');

const postCrtl = require ('../controllers/mainpage-controllers'); 

router.get('/', auth, postCrtl.readPost); 
router.get('/:id', auth, postCrtl.getUsersPosts);
router.post('/', auth, multer, postCrtl.createPost);
router.patch('/:id', auth,idComparePost, multer, postCrtl.updatePost); 
router.delete('/:id', auth, idComparePost, multer, postCrtl.deletePost); 
router.post('/:id/like', auth, postCrtl.likePost); 

// comments
router.patch('/comment/:id', auth, postCrtl.addComment); 
router.patch('/edit-comment/:id', auth, postCrtl.editComment); 
router.patch('/delete-comment/:id', auth, postCrtl.deleteComment); 
module.exports = router; 