// controllers/UserController.js
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/user'); // import your model
const JWT_SECRET = process.env.JWT_SECRET;

exports.getAllUser = async (req, res) => {
    try {
        const User = await User.all();
        res.json(User);
    } catch (err) {
        console.error('Error fetching User:', err);
        res.status(500).json({ error: 'Failed to fetch User' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.find(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Error fetching User:', err);
        res.status(500).json({ error: 'Failed to fetch User' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
};

exports.createUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // ✅ Use the model method instead of raw knex
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
        };

        const newUser = await User.create(userData);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error('Error creating User:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedUser = await User.update(id, { title, content });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating User:', err);
        res.status(500).json({ error: 'Failed to update User' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await User.delete(id);
        if (!deleted) return res.status(404).json({ error: 'User not found' });
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting User:', err);
        res.status(500).json({ error: 'Failed to delete User' });
    }
};


