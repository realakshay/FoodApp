const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },  
    image: String,
    addOns: [{
        name: String,
        price: Number
    }],
    tags: [String],
}, { timestamps: true });

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    tags: [String],
    rating: {
        type: Number,
        default: 0
    },
    location: {
        address: String,
        city: String,
        cords :{
            lat: Number,
            lng: Number
        }
    },
    menu: [MenuSchema],
    isOnline: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



module.exports = mongoose.model('Restaurant', RestaurantSchema);