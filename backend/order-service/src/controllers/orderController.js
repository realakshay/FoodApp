const axios = require('axios');
const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        console.log("ORDER => 000");
        const {restaurantId, items, paymentMethod, address} = req.body;

        console.log("ORDER => 0 (RES)", restaurantId);
        // check items first
        if(!items || items.length === 0){
            return res.status(400).json({message: 'Order must contain at least one item'});
        }
        // fetch restaurant to ensure it exists
        const restaurantResponse = await axios.get(`http://localhost:4000/restaurants/base/${restaurantId}`);
        const restaurant = restaurantResponse.data;
        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }

        console.log("ORDER => 1");
        // calculate total price
        let totalPrice = 0;
        let finalItems = [];
        for(const item of items){
            const menuItemRes = await axios.get(`http://localhost:4000/restaurants/base/${restaurantId}/menu/${item.menuItemId}`, {
                headers: { Authorization: req.headers.authorization }
            });
            console.log("ORDER => 2", menuItemRes.data);
            const menuItem = menuItemRes.data;
            if(!menuItem){
                return res.status(400).json({message: `Menu item with ID ${item.menuItemId} not found in restaurant ${restaurant.name}`});
            }
            if(item.quantity <= 0){
                return res.status(400).json({message: `Invalid quantity for item ${menuItem.name}`});
            }
            finalItems.push({
                menuItemId: menuItem._id,
                name: menuItem.name,
                quantity: item.quantity,
                price: menuItem.price,
                addOns: item.addOns || []
            });
            totalPrice += menuItem.price * item.quantity;
        }

        const order = new Order({
            user: req.user.id,
            restaurant: restaurantId,
            address,
            items: finalItems,
            totalPrice,
            paymentMethod
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get orders for a user
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        if(orders){
            const restaurantIds = [...new Set(orders.map(o => o.restaurant.toString()))];
            const restaurantsData = await axios.post('http://localhost:4000/restaurants/base/batch', { ids: restaurantIds }, {
                headers: { Authorization: req.headers.authorization }
            });
            const restaurantMap = {};
            restaurantsData.data.forEach(r => restaurantMap[r._id] = r);
            const ordersWithDetails = orders.map(order => ({
                ...order.toObject(),
                restaurant: restaurantMap[order.restaurant.toString()]
            }));
            return res.status(200).json(ordersWithDetails);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.log("ERROR",error);
        res.status(500).json({ message: 'Server error' });
    }
};


// get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('restaurant', 'name').populate('user', 'name email');
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        // ensure user can only access their own orders unless admin
        if(order.user._id.toString() !== req.user.id && !req.user.isAdmin){
            return res.status(403).json({message: 'Access denied'});
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        order.status = status;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    } 
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('restaurant', 'name').populate('user', 'name email').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};