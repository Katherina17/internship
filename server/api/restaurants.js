const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants')

router.get('/', async (req, res) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;

    try {
        const totalCount = await Restaurants.count();
        const restaurants = await Restaurants.find()
            .limit(pageSize)
            .skip(pageSize * (pageNumber - 1));

        res.json({
          data: restaurants,
          totalCount: totalCount,
        });
    } catch (err) {
        console.error(err.message);
    }

});

module.exports = router