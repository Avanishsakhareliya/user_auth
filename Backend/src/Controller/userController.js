const db = require("../Connection/Connection")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const TOKEN_KEY = "hellodeveloperforreactjsapp";


 module.exports.login = async (req, res) => {
    const { email, password, userType } = req.body;
      const sqlCheckUser = 'SELECT * FROM userindex WHERE email = ?';
    db.query(sqlCheckUser, [email], async (err, result) => {
      if (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ message: 'Error finding user' });
        return;
      }
  
      if (result.length > 0) {
        const user = result[0]; // Assuming email is unique, consider handling multiple results differently
  
        // Check if the userType matches the user's role
        if ((userType === 'customer' && user.role === 'admin') || (userType === 'admin' && user.role === 'customer')) {
          res.status(401).json({ message: 'You are not allowed to login from here' });
          return;
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Passwords match, create and send a token
          const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '24h' });
  
          const userAuth = {
            email: user.email,
            token: token,
            role: user.role,
            _id: user.srno // Assuming _id corresponds to srno in your userindex table
          };
  
          res.status(200).json({ message: 'User successfully logged in', userAuth });
        } else {
          res.status(401).json({ message: 'Password does not match' });
        }
      } else {
        res.status(401).json({ message: 'Invalid user credentials' });
      }
    });
  };


module.exports.signup = async (req, res) => {
    const { firstName, lastName, email, password ,role} = req.body;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const sqlCheckUser = 'SELECT * FROM userindex WHERE email = ?';
    db.query(sqlCheckUser, [email], async (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        res.status(400).json({ message: 'User already exists!' });
      } else {
        if (email.match(validRegex)) {
          const token = jwt.sign({ email }, TOKEN_KEY, {
            expiresIn: 86400, // expires in 24 hours
          });
  
          const sqlInsertUser = 'INSERT INTO userindex (firstName, lastName, email, password,token, role) VALUES (?, ?, ?, ?, ?,?)';
          db.query(sqlInsertUser, [firstName, lastName, email, hashedPassword, token, role], (err, insertResult) => {
            if (err) throw err;
  
            console.log('User created successfully:', insertResult);
            res.status(200).json({
              message: 'User created successfully',
              userData: { firstName, lastName, email, token, role },
            });
          });
        } else {
          res.status(400).json({ message: 'Invalid email format' });
        }
      }
    });
  };


module.exports.getAllCustomers = (req, res) => {
    const adminEmail = req.query.email;   
    // Check if the requester is an admin based on their email or role
    const sqlCheckAdmin = 'SELECT * FROM userindex WHERE email = ? AND role = "admin"';
    db.query(sqlCheckAdmin, [adminEmail], async (err, adminResult) => {
      if (err) {
        console.error('Error finding admin:', err);
        res.status(500).json({ message: 'Error finding admin' });
        return;
      }
  
      if (adminResult.length > 0) {
        // If the requester is an admin, fetch all customers' data
        const sqlGetCustomers = 'SELECT * FROM userindex WHERE role = "customer"';
        db.query(sqlGetCustomers, async (err, customers) => {
          if (err) {
            console.error('Error fetching customers:', err);
            res.status(500).json({ message: 'Error fetching customers' });
            return;
          }
  
          res.status(200).json({ message: 'Customer data retrieved successfully', customers });
        });
      } else {
        res.status(401).json({ message: 'Unauthorized access' });
      }
    });
  };
  