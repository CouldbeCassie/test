const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://cassaint.com', // Allow requests from your GitHub Pages domain
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));

// Routes
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
