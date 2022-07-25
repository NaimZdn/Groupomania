const express = require('express');
const router = express.Router(); 
const multer = require('../middlewares/multer-config'); 

const auth = require('../middlewares/auth'); 

const postCrtl = require ('../controllers/mainpage-controllers'); 

router.get('/', postCrtl.readPost); 
router.post('/', multer, postCrtl.createPost);
router.put('/:id', multer, postCrtl.updatePost); 
router.delete('/:id', multer, postCrtl.deletePost); 
router.post('/:id/like', postCrtl.likePost); 

// comments
router.patch('/comment/:id',postCrtl.addComment); 
router.patch('/edit-comment/:id', postCrtl.editComment); 
router.patch('/delete-comment/:id', postCrtl.deleteComment); 


module.exports = router; 