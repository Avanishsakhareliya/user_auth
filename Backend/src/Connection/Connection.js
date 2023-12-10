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

  const createUserIndexTable = `
  CREATE TABLE IF NOT EXISTS (
    srno INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(500),
    role ENUM('admin', 'customer') NOT NULL
  )
`;

  // Execute the query to create the table
  db.query(createUserIndexTable, (err, result) => {
    if (err) {
      console.error('Error creating userindex table:', err);
    } else {
      console.log('userindex table created successfully');
    }
    db.end();
  });

});

module.exports = db; // Export the db connection
