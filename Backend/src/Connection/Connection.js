const mysql = require('mysql');

// Create a connection to MySQL
const db = mysql.createConnection({
  host: 'localhost', // Your MySQL server host (e.g., localhost)
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'avanish_tech' // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

module.exports = db; // Export the db connection
