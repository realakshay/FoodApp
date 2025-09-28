const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.get('/me', (req, res)=>{
    res.json({message: "User data"});
})

module.exports = router;