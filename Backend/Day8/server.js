const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const users = {};  
let nextId = 1;

app.post('/create-user', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      const id = nextId++;
      users[id] = { id, username, passwordHash: hash };

      res.status(201).json({ message: 'User created', id, username });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = Object.values(users).find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  bcrypt.compare(password, user.passwordHash)
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.cookie('username', username, {
        httpOnly: true,                 
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
      });

      res.json({ message: 'Login successful', id: user.id, username });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error during login' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
