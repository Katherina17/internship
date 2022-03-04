const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants')

router.get('/', async (req, res) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const query  = {
        skip: pageSize * (pageNumber - 1),
        limit: pageSize
    };
    Restaurants.find({}, {}, query, function(err, data) {
        if (err) {
            response = {'status': 200, 'message': 'Error fetching data'};
        } else {
            response = {'data': data};
        }
        res.json(response);
    });
});

module.exports = router