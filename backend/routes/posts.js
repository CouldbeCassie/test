const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.patch('/', postController.updatePost);

module.exports = router;

