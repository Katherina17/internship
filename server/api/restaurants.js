const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants');

router.get('/', async (req, res) => {
    try {
        const films = await Restaurants.find();
        res.json(films)
    } catch(err){
        res.json({message: err})
    }
});

module.exports = router