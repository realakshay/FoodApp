const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login)
router.get('/me', (req, res)=>{
    res.json({message: "User data"});
})

module.exports = router;