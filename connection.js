const mysql = require('mysql2/promise'); // Using the promise API

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'note_app_nodejs',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection()
    .then((connection) => {
        console.log('Connected to MySQL database with mysql2');
        connection.release(); // Release the connection back to the pool
    })
    .catch((err) => {
        console.error('Database connection failed: ' + err.stack);
    });

module.exports = pool;