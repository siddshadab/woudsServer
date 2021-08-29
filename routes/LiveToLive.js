const express = require('express');
const router = express.Router();
const services = require('../services/LiveToLive');


router.route('/')
    .get(services.getLiveToLive)
router.route('/')
    .post(services.postLiveToLive)
router.route('/')
    .put(services.postLiveToLive)
router.route('/')
    .delete(services.postLiveToLive)

module.exports = router;