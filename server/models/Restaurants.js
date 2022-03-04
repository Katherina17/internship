const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    address: {
        type: Object,
        require: true,
    },
    borough: {
        type: String,
        require: true,
    },
    cuisine: {
        type: String,
        require: true,
    },
    grades: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    restaurant_id: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('restaurant', RestaurantSchema)