require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
const roleCheck = require('./middlewares/roleCheck');

const server = express();
server.use(express.json());

// Mock user database
const users = {
    'admin': { passwordHash: 'hashedPassword', role: 'admin' },
    'user': { passwordHash: 'hashedPassword', role: 'user' }
};

// Secure Login Route
server.post('/login', async (req, res) => {
    // Fetch user from the database
    const user = users[req.body.username];
    if (user && await bcrypt.compare(req.body.password, user.passwordHash)) {
        const token = jwt.sign({ username: req.body.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Protected admin route
server.get('/admin-data', auth, roleCheck('admin'), (req, res) => {
    res.send('Sensitive admin data');
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
