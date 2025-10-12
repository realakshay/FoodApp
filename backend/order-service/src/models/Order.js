const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    address: {
        fullName: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    items: [{
        menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1  
        },
        price: {
            type: Number,
            required: true
        },
        addOns: [{
            name: String,
            price: Number
        }]
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'On the way', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'UPI'],
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);