const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    res.json({ message: 'Register endpoint works' })
}

exports.login = async (req, res) => {
    res.json({ message: 'login endpoint works'})
}