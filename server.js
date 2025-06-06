const express = require('express');
const userRoutes = require('./routes/authentication');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;


// Enable CORS for all routes
app.use(cors())

app.use(express.json());
app.use(bodyParser.json()); // To parse JSON body


// Simple GET endpoint
app.get('/api/greet', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Mount your user routes
app.use('/api', userRoutes); // Prefix all user routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});