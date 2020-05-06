const express = require('express');
const router = express.Router();
const { computePayment } = require('../lib/service')

router.post('/upload', computePayment)


module.exports = router;
