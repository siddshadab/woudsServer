const express = require('express');
const router = express.Router();
const services = require('../services/BiddingChats');


router.route('/')
    .get(services.getChatsData)
router.route('/')
    .post(services.postChatsData)
router.route('/')
    .put(services.postChatsData)
router.route('/')
    .delete(services.postChatsData)

module.exports = router;