const express = require('express');
const app = express();
const PORT = 3000;

// Simple GET endpoint
app.get('/api/greet', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});