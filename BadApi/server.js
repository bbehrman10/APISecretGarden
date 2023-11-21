const express = require('express');
const server = express();

server.use(express.json());

//Insecure Data stored in plain text, in memory for brevity's sake
const users = {
    'admin': { password: 'admin123', role: 'admin' },
    'user': { password: 'user123', role: 'user' }
};

//Insecure Login Route
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        // Insecure: Authenticating without a secure token and returning user role
        res.json({ message: `Logged in as ${username}`, role: users[username].role });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

//Insecure Role-Based Access 
server.get('/admin-data', (req, res) => {
    // Insecure: Role-based access control based on client-provided data
    const role = req.query.role;

    if (role === 'admin') {
        res.send('Sensitive admin data');
    } else {
        res.status(403).send('Access Forbidden');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
