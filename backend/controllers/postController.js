let posts = [];

exports.getPosts = (req, res) => {
    res.json(posts);
};

exports.createPost = (req, res) => {
    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        username: req.body.username,
        content: req.body.content,
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0
    };
    posts.push(newPost);
    res.json(newPost);
};

exports.updatePost = (req, res) => {
    const { id, action } = req.body;
    const post = posts.find(p => p.id === id);
    if (post) {
        if (action === 'like') {
            post.likes += 1;
        } else if (action === 'dislike') {
            post.dislikes += 1;
        }
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
};

