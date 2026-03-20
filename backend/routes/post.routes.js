const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');
const postController = require('../controllers/post.controller');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, upload.single('image'), postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/:id/comments', auth, postController.addComment);

module.exports = router;
