const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const jwtSecret = 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const postSchema = new mongoose.Schema({
  content: String,
  likes: Number
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the Social Media App!');
});

app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  await user.save();
  res.send('User registered!');
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send('User not found');
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid password');
  }
  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.send({ token });
});

app.post('/posts', async (req, res) => {
  const post = new Post({
    content: req.body.content,
    likes: 0
  });
  await post.save();
  res.status(201).json(post);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/posts/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    post.likes++;
    await post.save();
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
