const express = require('express');
const router = express.Router();

const controller = require('../controllers/restaurantController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/list', controller.getAllRestaurants);
router.post('/create', verifyToken, isAdmin, controller.createRestaurant);
router.get('/:id', controller.getRestaurantById);
router.delete('/:id', verifyToken, isAdmin, controller.deleteRestaurant);
router.put('/:id', verifyToken, isAdmin, controller.updateRestaurant);

router.get('/:id/menu', controller.getMenu);

module.exports = router;