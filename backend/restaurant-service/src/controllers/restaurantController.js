const Restaurant = require('../models/Restaurant');

// For admin
exports.createRestaurant = async (req, res) => {
    try {
        const r = await Restaurant.create(req.body);
        res.status(201).json(r);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }  
};

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }
        return res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllRestaurants = async (req, res) => {
    try {
        const {query, tag} = req.query;
        const filter = {};
        if(query){
            filter.name = {$regex: query, $options: 'i'};
        }
        if(tag){
            filter.tags = tag;
        }
        const restaurants = await Restaurant.find(filter).select('-__v');
        res.status(200).json(restaurants);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }
        return res.status(200).json({message: 'Restaurant deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateRestaurant = async (req, res) => {
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }
        return res.status(200).json(restaurant);
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getMenu = async (req, res) => {
    try {
        const menu = await Restaurant.findById(req.params.id).select('menu');
        if(!menu){
            return res.status(404).json({message: 'Restaurant not found'});
        }
        return res.status(200).json(menu);
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

exports.addMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }
        restaurant.menu.push(req.body);
        await restaurant.save();
        return res.status(201).json(restaurant.menu);
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}
