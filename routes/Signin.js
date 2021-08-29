const express = require('express');
const router = express.Router();
const services = require('../services/Signin');

 
router.route('/')
    .post(services.postSignIn)
    router.route('/mobileCheck')
    .post(services.postMobileCheck)
    router.route('/getAllUsersonGrpCd')
    .get(services.getAllUsers)

module.exports = router;