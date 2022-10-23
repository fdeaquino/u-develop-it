const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost', 
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Saguaro2021!', 
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// IMPORTANT: this method is the key component that allows SQL commands to be written in a Node.js applicaiton 
// Breakdown: The db object is using the SQL query() method which executes the callback with the resulting rows that match the query - More explanation in 12.2.4
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// Default response for any other request (Not Found)
// Catchall route handles user requests that aren't supported by the app
app.use((req, res) => {
    res.status(404).end();
});

// connection function starts the Express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});