const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAdmin } = require('../../../restaurant-service/src/middleware/authMiddleware');

exports.register = async (req, res) => {
    console.log('register endpoint hit01');
    try {
        console.log('register endpoint hit');
        const { name, email, password, isAdmin } = req.body;
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
            password: hashedPassword, isAdmin
        });
        console.log('User created:', user);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' })
    }
}

exports.login = async (req, res) => {
    console.log('login endpoint hit');
    try{
        const { email, password } = req.body;
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const token = jwt.sign({id: userExists._id, isAdmin: userExists.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({
            id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
            token
        });
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' })
    }
}

exports.profile = async (req, res) => {
    if(!req.user){
        return res.status(401).json({message: 'Not authorized'})
    }
    res.status(200).json(req.user);
}