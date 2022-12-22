const express = require('express');
const router = express.Router();
const Order = require('../app/controllers/Oder');

router.post('/add_order', Order.AddOrder);


router.post('/getlist_of_items', Order.getlistofitems);

module.exports = router;