const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.post('/api/users', (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    user.save()
        .then(() => {
            res.status(201).json({
                message: "User registered successfully",
                user: { username, email }
            });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// ✅ GET - Fetch All Users
app.get('/api/users', (req, res) => {
    User.find().select('-password')
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
