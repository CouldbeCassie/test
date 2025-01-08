const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Replace with your own secret key
const jwtSecret = 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.model('User', userSchema);

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
