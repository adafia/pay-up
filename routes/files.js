const express = require('express');
const router = express.Router();
const { upload, compute, save } = require('../lib/service')

router.post('/upload', upload)
router.post('/compute', compute)
router.post('/approved', save)


module.exports = router;
