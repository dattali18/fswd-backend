const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const {getUserByEmail, createUser} = require('../models/user.js'); // Assuming you have a User model

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    // the rest of the data will be added later
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        user_name: "",
        first_name: "",
        last_name: "",
        email: email,
        password: hashedPassword,
        is_writer: false
    };

    try {
        await createUser(newUser);
        return res.status(201).send('User created');
    } catch (err) {
        return res.status(500).send('Error creating user');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await getUserByEmail(email);

        // console.log(user)

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // console.log(isPasswordValid)

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, user_name: user.user_name, email: user.email, is_writer: user.is_writer } });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;