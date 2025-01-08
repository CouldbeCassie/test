const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a new post
router.post('/create', auth, async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).send('Content is required');
    }
    const post = new Post({
        content,
        likes: 0,
        user: req.user.id
    });
    await post.save();
    res.status(201).send(post);
});

// Like a post
router.post('/:id/like', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    post.likes += 1;
    await post.save();
    res.status(200).send(post);
});

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
});

module.exports = router;
