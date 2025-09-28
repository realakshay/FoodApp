const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log('register endpoint hit');
        const { name, email, password } = req.body;
        console.log('Request body:', req.body);

        const userExists = await User.findOne({ email });
        console.log('User exists:', userExists);

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed');

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        console.log('User created:', user);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' })
    }
}

exports.login = async (req, res) => {
    console.log('login endpoint hit');
    res.json({ message: 'login endpoint works' });
}