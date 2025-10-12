const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/myorders', verifyToken, controller.getMyOrders);
router.post('/create', verifyToken, controller.createOrder);
router.get('/:id', verifyToken, controller.getOrderById);
router.put('/:id/status', verifyToken, controller.updateOrderStatus);
router.get('/list/all', verifyToken, isAdmin, controller.getAllOrders);

module.exports = router;