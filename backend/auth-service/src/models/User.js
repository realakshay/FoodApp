const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: [true, 'Nmae is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true},
    password: { type: String, required: [true, 'Password is required'], minlength: 6 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)